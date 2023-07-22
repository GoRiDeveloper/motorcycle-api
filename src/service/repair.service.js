import { Repair } from "../models/repair.model.js";
import { verifyValues } from "../utils/object.utils.js";

const STATUS_VALUES = {
    completed: "completed",
    pending: "pending",
    cancelled: "cancelled"
};

export const getPendings = async () => {

    try {

        const repairs = await Repair.findAll({
            where: {
                status: STATUS_VALUES.pending
            }
        });
        return repairs;

    } catch (e) {

        new Error(`Ocurrio un error : ${e}.`);
        return false;

    };

};

export const getPending = async (objProp) => {

    verifyValues(objProp);
    
    try {

        const repair = await Repair.findOne({
            where: {
                ...objProp,
                status: STATUS_VALUES.pending
            }
        });
        if (!repair) return new Error("La Cita Ya No Esta Pendiente.");
        return repair;

    } catch (e) {

        new Error(`Ocurrio un error : ${e}.`);
        return false;

    };

};

export const createAppointment = async (body) => {

    const appointment = {
        date: new Date(),
        userId: body.userId
    };

    if (body.status) 
        appointment.status = body.status;

    verifyValues(appointment);

    try {

        const create = await Repair.create(appointment);
        return create;
    
    } catch (e) {

        console.log(`Ocurrio Un Error : ${e}.`);
        return false;
        
    };
    

};

export const patchAppointment = async (id) => {

    try {

        const appointment = await getPending({ id });

        if (!appointment) 
            return new Error(`La Cita Con El ID: ${id}, ¡No Existe!.`);

        await appointment.update({ status: STATUS_VALUES.completed });

        return appointment;

    } catch (e) {

        new Error(`Ocurrio Un Error : ${e}.`);
        return false;

    };
    
};

export const cancellAppointment = async (id) => {

    try {

        const appointment = await getPending({ id });

        if (!appointment) 
            return new Error(`La Cita Con El ID: ${id}, ¡No Existe!.`);

        await appointment.update({ status: STATUS_VALUES.cancelled });

        return appointment;

    } catch (e) {

        new Error(`Ocurrio Un Error : ${e}.`);
        return false;

    };

};