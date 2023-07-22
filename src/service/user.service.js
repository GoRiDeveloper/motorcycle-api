import { User } from "../models/user.model.js";
import { verifyValues } from "../utils/object.utils.js";

export const getUsers = async () => {

    try {

        const users = await User.findAll({
            where: {
                status: true
            }
        });
        return users;

    } catch (e) {

        new Error(`Ocurrio Un Error : ${e}.`);
        return false;

    };

};

export const getUser = async (objProp) => {

    verifyValues(objProp);

    try {

        const user = await User.findOne({
            where: {
                ...objProp,
                status: true
            }
        });
        return user;
        
    } catch (e) {
      
        new Error(`Ocurrio Un Error : ${e}.`);
        return false;
        
    };

};

export const createUser = async (body) => {

    const user = {

        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
        status: body.status

    };
    verifyValues(user);

    try {

        const { email } = user;
        const emailExists = await getUser({ email });

        if (emailExists) 
            return new Error(`El Usuario Con El E-Mail: ${body.email}, ¡Ya Existe!.`);

        const createUser = await User.create(user);
        return createUser;
    
    } catch (e) {

        new Error(`Ocurrio Un Error : ${e}.`);
        return false;
        
    };

};

export const patchUser = async (id, body) => {

    try {

        const userExists = await getUser({ id });

        if (!userExists) 
            return new Error(`El Usuario Con El ID: ${id}, ¡No Existe!.`);

        await userExists.update(body);

        return userExists;

    } catch (e) {

        new Error(`Ocurrio Un Error : ${e}.`);
        return false;

    };

};

export const disableUser = async (id) => {

    try {

        const userExists = await getUser({ id });

        if (!userExists) 
            return new Error(`El Usuario Con El ID: ${id}, ¡No Existe!.`);

        await userExists.update({ status: false });

        return userExists;

    } catch (e) {

        new Error(`Ocurrio Un Error : ${e}.`);
        return false;

    };

};