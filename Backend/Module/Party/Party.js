import { Router } from 'express';
import { getAll, getOne, create, update, remove } from './PartyCn.js';
import IsLogin from '../../Middleware/isLogin.js';

const partyRouter = Router();

partyRouter
  .route('/')
  .get(IsLogin, getAll)
  .post(IsLogin, create);

partyRouter
  .route('/:id')
  .get(IsLogin, getOne)
  .patch(IsLogin, update)
  .delete(IsLogin, remove);

export default partyRouter;