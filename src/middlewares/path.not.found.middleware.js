import { AppError } from '../utils/app.error.js';

export const pathNotFound = (req, res, next) => {
    next(
        new AppError(`La Ruta "${req.originalUrl}" ¡No existe!`, 404)
    );
};
