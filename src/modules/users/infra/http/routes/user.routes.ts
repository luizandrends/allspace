import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UserController from '../controllers/CreateUserController';
import AuthenticateUserController from '../controllers/AuthenticateUserController';

const userController = new UserController();
const authenticateUserController = new AuthenticateUserController();

const userRouter = Router();

userRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      cpf: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

userRouter.post(
  '/authenticate',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.create
);

export default userRouter;
