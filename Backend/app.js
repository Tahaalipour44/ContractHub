import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { catchError, HandleERROR } from 'vanta-api';
import { fileURLToPath } from 'url';
import authRouter from './Module/Auth/Auth.js';
import userRouter from './Module/User/User.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirName = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors('*'));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use((req, res, next) => {
  return next(new HandleERROR('incorrect api url', 404));
});

app.use(catchError);
export default app;
