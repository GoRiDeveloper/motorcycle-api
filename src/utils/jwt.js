import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const jwtOptions = {
    expiresIn: config.jwtExiresIn,
};

export const generateJWT = (id) => {
    return new Promise((res, rej) => {
        jwt.sign(
            { id },
            config.jwtSecret,
            jwtOptions,
            (error, token) => {
                if (error) rej(error);

                res(token);
            }
        );
    });
};
