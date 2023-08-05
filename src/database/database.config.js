import { Sequelize } from 'sequelize';
import { config } from '../config/config.js';

export const db = new Sequelize(config.dbConfig);
