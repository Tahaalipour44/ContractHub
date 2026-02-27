import { Router } from 'express';
import { getAll, getOne, create, update, remove } from './NotificationCn.js';
import IsLogin from '../../Middleware/isLogin.js';

const notificationRouter = Router();

notificationRouter
  .route('/')
  .get(IsLogin, getAll)
  .post(IsLogin, create);

notificationRouter
  .route('/:id')
  .get(IsLogin, getOne)
  .patch(IsLogin, update)
  .delete(IsLogin, remove);

export default notificationRouter;