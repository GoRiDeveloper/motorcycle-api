import { User } from '../models/user.model.js';
import { config } from '../config/config.js';
import { verifyValues } from '../utils/object.utils.js';
import { AppError } from '../utils/app.error.js';
import { encryptPass, comparePass } from '../utils/password.utils.js';
import { generateJWT } from '../utils/jwt.js';

export const getUsers = async () => {
    const users = await User.findAndCountAll({
        where: {
            status: config.userStatus[0],
        },
        attributes: config.userAttributes,
    });

    return users;
};

export const getUser = async (objProp, attributes, error) => {
    verifyValues(objProp);

    const user = await User.findOne({
        where: {
            ...objProp,
            status: config.userStatus[0],
        },
        attributes: attributes ? attributes : config.userAttributes,
    });

    if (!user && error)
        throw new AppError('El Usuario No Existe.', 401);

    return user;
};

export const createUser = async (user) => {
    user.password = await encryptPass(user.password);

    const createUser = await User.create(user);
    const token = await generateJWT(createUser.id);

    return {
        token,
        user: {
            name: createUser.name,
            email: createUser.email,
        },
    };
};

export const patchUser = async (id, body) => {
    const attributes = [...config.userAttributes, 'id'];
    const userExists = await getUser({ id }, attributes, true);

    await userExists.update(body);

    return {
        name: userExists.name,
        email: userExists.email,
        updatedAt: userExists.updatedAt,
    };
};

export const disableUser = async (id) => {
    const attributes = [...config.userAttributes, 'id'];
    const user = await getUser({ id }, attributes, true);

    return await user.update({ status: false });
};

export const login = async (data) => {
    const { email, password } = data;

    const attributes = [...config.userAttributes, 'id', 'password'];
    const userExists = await getUser({ email }, attributes, true);

    await comparePass(password, userExists.password);

    const token = await generateJWT(userExists.id);

    return {
        token,
        user: {
            name: userExists.name,
            email: userExists.email,
        },
    };
};
