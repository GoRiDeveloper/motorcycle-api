import {

    getPendings,
    getPending,
    createAppointment,
    patchAppointment,
    cancellAppointment

} from "../service/repair.service.js";

export const findAll = async (req, res) => {

    const repairs = await getPendings();

    if (!repairs) {

        return res.status(404).json({
            message: "No Se Encontraron Reparaciones Pendientes",
            status: "fail",
            repairs
        });

    };

    res.status(200).json({
        results: repairs.lenght,
        status: "success",
        repairs
    });

};

export const findOne = async ({ params: { id } }, res) => {

    const repair = await getPending({ id });

    if (!repair) {

        return res.status(404).json({
            message: `La Reparación Con El ID ${id}, No Existe`,
            status: "fail",
            repair
        });

    };

    res.status(200).json({
        status: "success",
        repair
    });

};

export const create = async ({ body }, res) => {

    const appointment = await createAppointment(body);

    if (!appointment) {

        return res.status(500).json({
            message: "No Se Pudo Crear La Cita.",
            status: "fail",
            appointment
        });

    };

    res.status(201).json({
        message: "Cita Creada",
        status: "success",
        appointment
    });

};

export const update = async ({ params: { id } }, res) => {

    const updateAppointment = await patchAppointment(id);

    if (!updateAppointment) {

        return res.status(500).json({
            message: "No Se Pudo Actualizar La Cita",
            status: "fail",
            appointment: updateAppointment
        });

    };

    res.status(200).json({
        message: "Cita Actualizada.",
        status: "success",
        appointment: updateAppointment
    })

};

export const cancell = async ({ params: { id } }, res) => {

    const appointment = await cancellAppointment(id);

    if (!appointment) {

        return res.status(500).json({
            message: "No Se Pudo Cancelar La Cita.",
            status: "fail",
            appointment
        });

    };

    res.status(200).json({
        message: "Cita Cancelada",
        status: "success",
        appointment
    });

};