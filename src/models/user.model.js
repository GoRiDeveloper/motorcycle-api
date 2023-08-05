import { DataTypes } from 'sequelize';
import { db } from '../database/database.config.js';

export const User = db.define('user', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(40),
    },
    email: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING(75),
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    role: {
        allowNull: true,
        defaultValue: 'client',
        type: DataTypes.ENUM('client', 'employee'),
    },
    status: {
        allowNull: true,
        defaultValue: 'available',
        type: DataTypes.ENUM(['available', 'disabled']),
    },
});
