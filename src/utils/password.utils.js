import bcrypt from 'bcryptjs';
import { config } from '../config/config.js';
import { AppError } from './app.error.js';

export const encryptPass = async (pass) => {
    const salt = await bcrypt.genSalt(config.salt);
    return await bcrypt.hash(pass, salt);
};

export const comparePass = async (pass, encryptPass) => {
    const isCorrect = await bcrypt.compare(pass, encryptPass);
    if (!isCorrect) throw new AppError('Contraseña Incorrecta.', 400);
};
