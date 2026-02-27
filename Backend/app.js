import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { catchError, HandleERROR } from 'vanta-api';
import { fileURLToPath } from 'url';
import authRouter from './Module/Auth/Auth';
import userRouter from './Module/User/User';
import contractRouter from './Module/Contract/Contract';
import contractVersionRouter from './Module/ContractVersion/ContractVersion';
import partyRouter from './Module/Party/Party';
import notificationRouter from './Module/Notification/Notification.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirName = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/contracts', contractRouter);
app.use('/api/contract-versions', contractVersionRouter);
app.use('/api/parties', partyRouter);
app.use('/api/notifications', notificationRouter);

// Catch incorrect routes
app.all('*', (req, res, next) => {
  return next(new HandleERROR('Incorrect API URL', 404));
});
app.use(catchError);

export default app;
