import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { validateSchema } from '../middlewares/validateSchema';
import { newUserSchema } from '../schemas/newUserSchema';

const userRouter = Router();

userRouter.post('/signup', validateSchema(newUserSchema), createUser);

export default userRouter;
