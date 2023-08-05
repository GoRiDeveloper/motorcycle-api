import { config as configEnv } from 'dotenv';

configEnv();

const env = process.env;

export const config = Object.freeze({
    serverPort: +env.PORT || 0,
    mode: env.MODE,
    secret: env.SECRET,
    jwtSecret: env.SECRET_JWT_SEED,
    jwtExiresIn: env.JWT_EXPIRES_IN,
    salt: +env.SALT,
    modes: Object.freeze({
        development: 'dev',
        production: 'prod',
    }),
    dbConfig: Object.freeze({
        dialect: env.DB_DIALECT,
        database: env.DB_NAME,
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        host: env.DB_HOST,
        port: +env.DB_PORT,
        logging: false,
    }),
    userStatus: ['available', 'disabled'],
    userAttributes: ['name', 'email'],
    roles: ['client', 'employee'],
});
