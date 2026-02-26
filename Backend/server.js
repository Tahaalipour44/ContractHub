import mongoose from 'mongoose';
import app, { __dirName } from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirName}/config.env` });

mongoose
  .connect(process.env.DATA_BASE_URL)
  .then(() => {
    console.log('DB ✅ Database connected successfully');
  })
  .catch((error) => {
    console.error('DB ❌ Database connection failed:', error);
  });

app.listen(process.env.PORT, () => {
  console.log(`SERVER ✅ server running on ${process.env.PORT}`);
});
