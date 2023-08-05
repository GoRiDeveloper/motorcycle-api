import { Router } from 'express';
import {
    validateYourUser,
    protect,
} from '../middlewares/auth.middleware.js';
import {
    createUserValidator,
    paramIdValidator,
    userExists,
    clientUpdateValidator,
    loginValidator,
    validateEmail,
} from '../middlewares/validate.middleware.js';
import {
    findAll,
    findOne,
    create,
    update,
    deleteOne,
    signIn,
} from '../controllers/user.controller.js';

export const userRouter = Router();

userRouter
    .route('/')
    .get(findAll)
    .post(createUserValidator, validateEmail, create);

userRouter.route('/login').post(loginValidator, signIn);

userRouter.use('/:id', paramIdValidator, userExists);

userRouter.route('/:id').get(findOne);

userRouter
    .use('/:id', protect, validateYourUser)
    .route('/:id')
    .patch(clientUpdateValidator, update)
    .delete(deleteOne);
