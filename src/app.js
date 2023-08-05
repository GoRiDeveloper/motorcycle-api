import express from 'express';
import { userRouter } from './routers/users.router.js';
import { repairRouter } from './routers/repairs.router.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';
import { pathNotFound } from './middlewares/path.not.found.middleware.js';

export const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/repairs', repairRouter);

app.all('*', pathNotFound);

app.use(globalErrorHandler);
