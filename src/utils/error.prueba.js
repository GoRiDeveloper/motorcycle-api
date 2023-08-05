import { AppError } from './app.error.js';

export const errorDePrueba = () =>
    new AppError('Error De Prueba JEJE', 400);
