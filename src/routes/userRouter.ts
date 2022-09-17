import { Router } from 'express';
import { createUser, signIn } from '../controllers/userController';
import { validateSchema } from '../middlewares/validateSchema';
import { newUserSchema } from '../schemas/newUserSchema';
import { userSchema } from '../schemas/userSchema';

const userRouter = Router();

userRouter.post('/signup', validateSchema(newUserSchema), createUser);
userRouter.post('/signin', validateSchema(userSchema), signIn);

export default userRouter;
