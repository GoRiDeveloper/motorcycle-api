import { config } from '../config/config.js';
import {
    sendErrorDev,
    sendErrorProd,
} from '../controllers/error.controller.js';
import {
    handleCastError22001,
    handleCastError22P02,
    handleCastError2305,
    handleJWTExpiredError,
    handleJWTError,
    handleSequelizeValidationError,
    handleSequelizeDbError,
} from '../utils/errors.js';

const ERROR_TYPES = Object.freeze({
    exceededLength: Object.freeze({
        name: '',
        code: '22001',
    }),
    invalidTypeData: Object.freeze({
        code: '22P02',
    }),
    duplicateValue: Object.freeze({
        code: '2305',
    }),
    tokenExpired: Object.freeze({
        name: 'TokenExpiredError',
    }),
    invalidToken: Object.freeze({
        name: 'JsonWebTokenError',
    }),
    sequelizeValidation: Object.freeze({
        name: 'SequelizeValidationError',
    }),
    sequelizeDatabase: Object.freeze({
        name: 'SequelizeDatabaseError',
    }),
});

export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail';

    if (config.mode === config.modes.development)
        sendErrorDev(err, res);

    if (config.mode === config.modes.production) {
        let error = err;

        if (err.parent?.code === ERROR_TYPES.exceededLength.code)
            error = handleCastError22001();
        if (err.parent?.code === ERROR_TYPES.invalidTypeData.code)
            error = handleCastError22P02();
        if (err.parent?.code === ERROR_TYPES.duplicateValue.code)
            error = handleCastError2305();
        if (err.name === ERROR_TYPES.invalidToken.name)
            error = handleJWTError();
        if (err.name === ERROR_TYPES.tokenExpired.name)
            error = handleJWTExpiredError();
        if (err.name === ERROR_TYPES.sequelizeValidation.name)
            error = handleSequelizeValidationError(err.errors);
        if (err.name === ERROR_TYPES.sequelizeDatabase.name)
            error = handle();

        sendErrorProd(error, res);
    }
};
