import { Router } from 'express';

import IsLogin from '../../Middleware/isLogin.js';
import { create, getAll, getOne, remove, update } from './ContractCn.js';

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