import { Router } from 'express';
import { getAll, getOne, create, update, remove } from './ContractCn.js';
import IsLogin from '../../Middleware/isLogin.js';

const contractRouter = Router();

contractRouter
  .route('/')
  .get(IsLogin, getAll)
  .post(IsLogin, create);

contractRouter
  .route('/:id')
  .get(IsLogin, getOne)
  .patch(IsLogin, update)
  .delete(IsLogin, remove);

export default contractRouter;