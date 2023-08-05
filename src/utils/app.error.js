export class AppError extends Error {
    constructor(message, statusCode) {
        super(JSON.stringify(message));

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')
            ? 'error'
            : 'fail';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constuctor);
    }
}
