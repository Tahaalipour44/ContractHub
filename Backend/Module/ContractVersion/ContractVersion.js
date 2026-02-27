import { Router } from 'express';
import { getAll, getOne, create, update, remove } from './ContractCn.js';
import IsLogin from '../../Middleware/isLogin.js';

const contractVersionRouter = Router();

contractVersionRouter
  .route('/')
  .get(IsLogin, getAll)
  .post(IsLogin, create);

contractVersionRouter
  .route('/:id')
  .get(IsLogin, getOne)
  .patch(IsLogin, update)
  .delete(IsLogin, remove);

export default contractVersionRouter;