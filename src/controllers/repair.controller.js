import { catchAsync } from '../utils/catch.async.js';
import {
    getPendings,
    getPending,
    createAppointment,
    patchAppointment,
    cancellAppointment,
} from '../service/repair.service.js';

export const findAll = catchAsync(async (req, res, next) => {
    const { rows: repairs, count: results } = await getPendings();

    res.status(200).json({
        status: 'success',
        ...(results < 1 && { message: 'No Hay Citas Pendientes' }),
        results,
        repairs,
    });
});

export const findOne = catchAsync(async (req, res, next) => {
    const repair = await getPending({ id: req.params.id });

    res.status(200).json({
        status: 'success',
        repair,
    });
});

export const create = catchAsync(async (req, res, next) => {
    const appointment = await createAppointment(req.body);

    res.status(201).json({
        status: 'success',
        message: 'Cita Creada',
        appointment,
    });
});

export const update = catchAsync(async (req, res, next) => {
    await patchAppointment(req.params.id);

    res.status(204).json({
        status: 'success',
        message: 'Cita Actualizada.',
    });
});

export const cancell = catchAsync(async (req, res, next) => {
    await cancellAppointment(req.params.id);

    res.status(204).json({
        status: 'success',
        message: 'Cita Cancelada',
    });
});
