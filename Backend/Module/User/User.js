import { Router } from 'express';
import { getOne, update, remove, changePassword } from './UserCn.js';
import IsLogin from '../../Middleware/isLogin.js';

const userRouter = Router();

userRouter
  .route('/')
  .get(IsLogin, getOne)
  .patch(IsLogin, update)
  .delete(IsLogin, remove);
userRouter.route('/change-pass').patch(IsLogin, changePassword);
export default userRouter;
