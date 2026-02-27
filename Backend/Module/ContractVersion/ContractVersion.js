import { Router } from 'express';

import IsLogin from '../../Middleware/isLogin.js';
import { create, getAll, getOne, remove, update } from './ContractVersionCn.js';

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