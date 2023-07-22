export const clientUpdateValidator = ({ body }, res, next) => {

    const uniqueFieldsToUpdate = ["name", "email"];

    for (const key in body)
        if (!uniqueFieldsToUpdate.includes(key))
            delete body[key];
            
    next();

};