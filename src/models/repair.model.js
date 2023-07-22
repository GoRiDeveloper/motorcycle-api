import { DataTypes } from "sequelize";
import { db } from "../database/database.config.js";

export const Repair = db.define("repair", {

    id: {

        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER

    },
    date: {
        allowNull: false,
        type: DataTypes.DATE
    },
    status: {

        allowNull: true,
        defaultValue: "pending",
        type: DataTypes.ENUM("pending", "completed", "cancelled")

    },
    userId: {

        field: "user_id",
        allowNull: false,
        type: DataTypes.INTEGER

    }

});