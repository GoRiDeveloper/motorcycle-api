import { AppError } from './app.error.js';

export const verifyValues = (obj) => {
    const isArr = Array.isArray(obj);

    if (isArr)
        throw new AppError('El Parametro No Es Un Objeto.', 500);

    for (const key in obj) {
        const value = obj[key];
        if (!value)
            throw new AppError(
                `El objeto con la Clave "${key}" y el valor "${value}", no es válido.`,
                500
            );
    }
};
