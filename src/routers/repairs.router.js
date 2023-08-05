import { Router } from 'express';
import { config } from '../config/config.js';
import {
    paramIdValidator,
    createAppointmentValidator,
} from '../middlewares/validate.middleware.js';
import {
    protect,
    restrictTo,
} from '../middlewares/auth.middleware.js';
import {
    findAll,
    create,
    findOne,
    update,
    cancell,
} from '../controllers/repair.controller.js';

export const repairRouter = Router();

repairRouter.use(protect);

repairRouter.post('/', createAppointmentValidator, create);

repairRouter.use(restrictTo(config.roles[1]));

repairRouter.route('/').get(findAll);

repairRouter
    .use('/:id', paramIdValidator)
    .route('/:id')
    .get(findOne)
    .patch(update)
    .delete(cancell);
