import { config } from './config/config.js';
import { db } from './database/database.config.js';
import { InitModel } from './models/init.model.js';
import { app } from './app.js';

const { serverPort } = config;

try {
    await db.authenticate();
    InitModel();
    await db.sync();
    console.log('Base de Datos sincronizada y autenticada.');
} catch (e) {
    console.log('Error: ' + e);
    process.exit(1);
}

app.listen(serverPort, () =>
    console.log(`Conectado en el Puerto: ${serverPort}`)
);
