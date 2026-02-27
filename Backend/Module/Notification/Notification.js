import { Router } from 'express';

import IsLogin from '../../Middleware/isLogin.js';
import { create, getAll, getOne, remove } from './NotificationCn.js';
import { update } from '../User/UserCn.js';

const notificationRouter = Router();

notificationRouter.route('/').get(IsLogin, getAll).post(IsLogin, create);

notificationRouter
  .route('/:id')
  .get(IsLogin, getOne)
  .patch(IsLogin, update)
  .delete(IsLogin, remove);

export default notificationRouter;
