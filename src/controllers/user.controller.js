import {

    getUsers,
    getUser,
    createUser,
    patchUser,
    disableUser

} from "../service/user.service.js";

export const findAll = async (req, res) => {

    const users = await getUsers();

    if (!users) {

        return res.status(404).json({
            message: "No Se Encontraron Usuarios",
            status: "fail",
            users
        });

    };

    res.status(200).json({
        message: "Usuarios encontrados",
        status: "success",
        users
    });

};

export const findOne = async ({ params: { id } }, res) => {

    const user = await getUser({ id });

    if (!user) {

        return res.status(404).json({
            message: `El Usuario Con El ID ${id}, No Existe`,
            status: "fail",
            user
        });

    };

    res.status(200).json({
        message: "Usuario Encontrado",
        status: "success",
        user
    });

};

export const create = async ({ body }, res) => {

    const user = await createUser(body);

    if (!user) {

        return res.status(500).json({
            message: "No Se Pudo Crear El Usuario.",
            status: "fail",
            user
        });

    };

    res.status(201).json({
        message: "Usuario Creado",
        status: "success",
        user
    });

};

export const update = async ({ body, params: { id } }, res) => {

    const updateUser = await patchUser(id, body);

    if (!updateUser) {

        return res.status(500).json({
            message: "No Se Pudo Actualizar El Usuario",
            status: "fail",
            user: updateUser
        });

    };

    res.status(200).json({
        message: "Usuario Actualizado",
        status: "success",
        user: updateUser
    })

};

export const deleteOne = async ({ params: { id } }, res) => {

    const userDeleted = await disableUser(id);

    if (!userDeleted) {

        return res.status(500).json({
            message: "No Se Pudo Eliminar El Usuario.",
            status: "fail",
            userDeleted
        });

    };

    res.status(200).json({
        message: "Usuario Deshabilitado",
        status: "success",
        user: userDeleted
    });

};