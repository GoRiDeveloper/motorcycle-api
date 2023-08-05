import { config } from '../config/config.js';
import { Repair } from '../models/repair.model.js';
import { User } from '../models/user.model.js';
import { AppError } from '../utils/app.error.js';
import { verifyValues } from '../utils/object.utils.js';

const STATUS_VALUES = Object.freeze({
    completed: 'completed',
    pending: 'pending',
    cancelled: 'cancelled',
});

export const getPendings = async () => {
    const repairs = await Repair.findAndCountAll({
        where: {
            status: STATUS_VALUES.pending,
        },
        attributes: {
            exclude: ['id', 'userId'],
        },
        include: [
            {
                model: User,
                attributes: config.userAttributes,
            },
        ],
    });

    return repairs;
};

export const getPending = async (objProp, attributes) => {
    verifyValues(objProp);

    const repair = await Repair.findOne({
        where: {
            ...objProp,
            status: STATUS_VALUES.pending,
        },
        attributes: {
            exclude: [
                attributes.includes('id') ? '' : 'id',
                'userId',
            ],
        },
        include: [
            {
                model: User,
                attributes: config.userAttributes,
            },
        ],
    });

    if (!repair)
        return new AppError('La Cita Ya No Esta Pendiente.', 404);

    return repair;
};

export const createAppointment = async (data) => {
    const appointment = await Repair.create(data);

    return {
        date: appointment.date,
        motorsNumber: appointment.motorsNumber,
        description: appointment.description,
    };
};

export const patchAppointment = async (id) => {
    const attributes = ['id'];
    const appointment = await getPending({ id }, attributes);

    return await appointment.update({
        status: STATUS_VALUES.completed,
    });
};

export const cancellAppointment = async (id) => {
    const attributes = ['id'];
    const appointment = await getPending({ id }, attributes);

    return await appointment.update({
        status: STATUS_VALUES.cancelled,
    });
};
