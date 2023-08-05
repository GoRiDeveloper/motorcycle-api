import { promisify } from 'node:util';
import jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catch.async.js';
import { AppError } from '../utils/app.error.js';
import { config } from '../config/config.js';
import { getUser } from '../service/user.service.js';

export const validateYourUser = (req, res, next) => {
    const yourUserId = req.sessionUser.id;
    const userId = req.user.id;

    if (yourUserId !== userId)
        next(
            new AppError(
                'No Puedes Realizar Esta Acción. ¡Inicia Sesión Con Tu Usuario!',
                403
            )
        );

    next();
};

export const protect = catchAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
        token = req.headers.authorization.split(' ')[1];

    if (!token)
        return next(
            new AppError(
                'No Has Iniciado Sesión, ¡Inicia Sesión!',
                401
            )
        );

    const decoded = await promisify(jwt.verify)(
        token,
        config.jwtSecret
    );

    const attributes = [...config.userAttributes, 'role', 'id'];
    const userExists = await getUser(
        { id: decoded.id },
        attributes,
        true
    );

    if (userExists.passwordChangedAt) {
        const changedTimeStamp = parseInt(
            userExists.passwordChangedAt.getTime() / 1000,
            10
        );

        if (decoded.iat < changedTimeStamp)
            return next(
                new AppError(
                    'El Usuario Cambio Recientemente Su Contraseña.',
                    401
                )
            );
    }

    req.sessionUser = userExists;

    next();
});

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.sessionUser.role))
            return next(
                new AppError(
                    'No Tienes Permisos Para Realizar Esta Acción.',
                    403
                )
            );
        next();
    };
};
