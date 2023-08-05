import { AppError } from './app.error.js';

export const handleCastError22001 = () =>
    new AppError('La Longitud Fue Excedida.', 400);

export const handleCastError22P02 = () =>
    new AppError(
        'El Tipo De Dato En La Base De Datos Es Invalido.',
        400
    );

export const handleCastError2305 = () =>
    new AppError('El Valor Del Campo Ya Existe', 400);

export const handleJWTError = () =>
    new AppError('Token Invalido O Manipulado.', 401);

export const handleJWTExpiredError = () =>
    new AppError(
        'El Token Ha Expirado. ¡Vuelve a Iniciar Sesión!',
        401
    );

export const handleSequelizeValidationError = (errors) => {
    const cleanErrors = errors.map((error) => {
        const message = `El Campo ${error.path} Con Valor ${error.value}, No Es valido.`;
        return {
            message,
        };
    });

    return new AppError(cleanErrors, 400);
};

export const handleSequelizeDbError = () =>
    new AppError(
        'Hubo Un Error Al Intentar Guardar En La Base De Datos.',
        500
    );
