import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {

    findAll,
    findOne,
    create,
    update,
    cancell

} from "../controllers/repair.controller.js";

export const repairRouter = Router();

repairRouter.route("/")
    .get(auth, findAll)
    .post(auth, create);

repairRouter.route("/:id")
    .get(auth, findOne)
    .patch(auth, update)
    .delete(auth, cancell);