import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirName = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors('*'));

export default app;
