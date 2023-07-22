import { app } from "./app.js";
import { config } from "./config/config.js";
import { db } from "./database/database.config.js";

const { serverPort } = config;

try {

    await db.authenticate();
    await db.sync();
    console.log("Base de Datos sincronizada y autenticada.");
    
} catch (e) {

    console.log("Error: " + e);
    process.exit(1);

};

app.listen(serverPort, () => console.log(`Conectado en el Puerto: ${serverPort}`));