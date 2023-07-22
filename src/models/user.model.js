import { DataTypes } from "sequelize";
import { db } from "../database/database.config.js";

export const User = db.define("user", {

    id: {

        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER

    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    email: {

        unique: true,
        allowNull: false,
        type: DataTypes.STRING(50)

    },
    password: {
        allowNull: false,
        type: DataTypes.STRING(30)
    },
    role: {

        allowNull: true,
        defaultValue: "client",
        type: DataTypes.ENUM("client", "employee")

    },
    status: {

        allowNull: true,
        defaultValue: true,
        type: DataTypes.BOOLEAN
        
    }

});