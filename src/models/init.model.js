import { User } from './user.model.js';
import { Repair } from './repair.model.js';

export const InitModel = () => {
    User.hasMany(Repair);
    Repair.belongsTo(User);
};
