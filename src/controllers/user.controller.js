import { catchAsync } from '../utils/catch.async.js';
import {
    getUsers,
    createUser,
    patchUser,
    disableUser,
    login,
} from '../service/user.service.js';

export const findAll = catchAsync(async (req, res, next) => {
    const { rows: users, count: results } = await getUsers();

    res.status(200).json({
        status: 'success',
        message: 'Usuarios Encontrados',
        results,
        users,
    });
});

export const findOne = catchAsync(async (req, res, next) => {
    const { user } = req;

    res.status(200).json({
        message: 'Usuario Encontrado',
        status: 'success',
        user: {
            name: user.name,
            email: user.email,
        },
    });
});

export const create = catchAsync(async (req, res, next) => {
    const { token, user } = await createUser(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Usuario Creado',
        token,
        user,
    });
});

export const update = catchAsync(async (req, res) => {
    const updateUser = await patchUser(req.params.id, req.body);

    res.status(200).json({
        message: 'Usuario Actualizado',
        status: 'success',
        user: updateUser,
    });
});

export const deleteOne = catchAsync(async (req, res, next) => {
    const userDisabled = await disableUser(req.params.id);

    res.status(204).json({
        status: 'success',
        message: 'Usuario Deshabilitado.',
        userDisabled,
    });
});

export const signIn = catchAsync(async (req, res, next) => {
    const { token, user } = await login(req.body);

    res.status(200).json({
        status: 'success',
        token,
        user,
    });
});
