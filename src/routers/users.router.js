import { Router } from "express";
import { clientUpdateValidator } from "../middlewares/validate.middleware.js";
import {

    findAll,
    findOne,
    create,
    update,
    deleteOne

} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.route("/")
    .get(findAll)
    .post(create);

userRouter.route("/:id")
    .get(findOne)
    .patch(clientUpdateValidator, update)
    .delete(deleteOne);