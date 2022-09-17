import { Router } from 'express';
import { createTest } from '../controllers/testController';
import { validateSchema } from '../middlewares/validateSchema';
import { testSchema } from '../schemas/testSchema';

const testRouter = Router();

testRouter.post('/tests/create', validateSchema(testSchema), createTest);

export default testRouter;
