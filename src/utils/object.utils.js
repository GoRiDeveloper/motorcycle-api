export const verifyValues = (obj) => {

    const isArr = Array.isArray(obj);

    if (isArr) 
        return new Error("El parametro no es un Objeto.");

    for (const key in obj) {

        const value = obj[key];
        if (!value) 
            return new Error(`El objeto con la Clave "${key}" y el valor "${value}", no es válido.`);
        
    };

};