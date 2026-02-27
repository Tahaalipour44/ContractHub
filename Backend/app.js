import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { catchError, HandleERROR } from 'vanta-api';
import { fileURLToPath } from 'url';
import authRouter from './Module/Auth/Auth.js';
import userRouter from './Module/User/User.js';
import contractRouter from './Module/Contract/Contract.js';
import contractVersionRouter from './Module/ContractVersion/ContractVersion.js';
import partyRouter from './Module/Party/Party.js';
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
app.use((req, res, next) => {
  return next(new HandleERROR('Route Not Found', 404));
});
app.use(catchError);

export default app;
