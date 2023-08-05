import { param, body, validationResult } from 'express-validator';
import { catchAsync } from '../utils/catch.async.js';
import { getUser } from '../service/user.service.js';
import { AppError } from '../utils/app.error.js';
import { Repair } from '../models/repair.model.js';
import { config } from '../config/config.js';

const validateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.mapped(),
        });
    }
    next();
};

const validateAppointment = ({ body, sessionUser }, res, next) => {
    for (const key in body) {
        const model = { ...Repair.getAttributes() };

        delete model.id;
        delete model.status;
        delete model.userId;

        const modelUpdate = Object.keys(model);

        if (!modelUpdate.includes(key)) delete body[key];
        body.userId = sessionUser.id;
    }

    next();
};

export const paramIdValidator = [
    param('id')
        .notEmpty()
        .withMessage('El ID Es Obligatorio.')
        .trim()
        .toInt(),
    validateFields,
];

export const createUserValidator = [
    body('name')
        .notEmpty()
        .withMessage('El Nombre Es Obligatorio.')
        .isString()
        .withMessage('El Nombre Debe Ser Texto.')
        .isLength({ min: 1 })
        .withMessage('El Nombre Debe Tener Más De Un Cáracter.')
        .toLowerCase()
        .trim(),
    body('email')
        .notEmpty()
        .withMessage('El E-Mail Es Obligatorio.')
        .isEmail()
        .withMessage('El E-Mail No Es Valido.')
        .toLowerCase()
        .trim(),
    body('password')
        .notEmpty()
        .withMessage('La Contraseña Es Obligatoria.')
        .isStrongPassword()
        .withMessage('La Contraseña Debe Ser Segura'),
    body('role')
        .optional()
        .notEmpty()
        .withMessage('El Rol No Puede Ir Vacío.')
        .isIn(['employee', 'client'])
        .withMessage('El Rol No Es Valido.'),
    validateFields,
];

export const createAppointmentValidator = [
    body('date')
        .notEmpty()
        .withMessage('La Fecha Es Requerida.')
        .isString()
        .withMessage('La Fecha Debe Ser Un Texto.')
        .isISO8601()
        .withMessage('La Fecha Debe Estar En Formato ISO8601.'),
    body('motorsNumber')
        .notEmpty()
        .withMessage('El Número De Motores Es Requerido.')
        .isNumeric({ no_symbols: true })
        .withMessage('El Número De Motores Debe Ser Un Número')
        .isInt()
        .withMessage(
            'El Número De Motores Debe Ser Un Número Entero'
        ),
    body('description')
        .notEmpty()
        .withMessage('La Descripción Es Requerida.')
        .isLength({ min: 20 })
        .withMessage('La Descripción Debe Ser Más Especifica'),
    validateFields,
    validateAppointment,
];

export const loginValidator = [
    body('email')
        .notEmpty()
        .withMessage('El E-Mail Es Requerido.')
        .isEmail()
        .withMessage('El E-Mail Es Invalido.'),
    body('password')
        .notEmpty()
        .withMessage('La Contraseña Es Requerida.'),
    validateFields,
];

export const clientUpdateValidator = ({ body }, res, next) => {
    const uniqueFieldsToUpdate = ['name', 'email'];

    for (const key in body)
        if (!uniqueFieldsToUpdate.includes(key)) delete body[key];

    next();
};

export const userExists = catchAsync(async (req, res, next) => {
    if (!req.user) {
        const { id } = req.params;
        const attributes = [...config.userAttributes, 'id'];
        const user = await getUser({ id }, attributes, true);

        req.user = user;
    }
    next();
});

export const validateEmail = catchAsync(async (req, res, next) => {
    const email = req.body.email;
    const user = await getUser({ email }, false, false);

    if (user)
        throw new AppError(
            `El Usuario Con El E-Mail: ${email}, ¡Ya Existe!.`,
            400
        );

    next();
});
