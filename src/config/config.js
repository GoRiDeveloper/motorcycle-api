import { config as configEnv } from "dotenv";

configEnv();

const env = process.env;

export const config = {

    serverPort: +env.PORT || 0,
    dbConfig: {

        dialect: env.DB_DIALECT,
        database: env.DB_NAME,
        username: env.DB_USER,
        password: env.DB_PASSWORD,
        host: env.DB_HOST,
        port: +env.DB_PORT,
        logging: false

    }

};