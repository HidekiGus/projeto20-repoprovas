import { Router } from 'express';
import { createTest, getTestsByTerm } from '../controllers/testController';
import { validateSchema } from '../middlewares/validateSchema';
import { testSchema } from '../schemas/testSchema';

const testRouter = Router();

testRouter.post('/tests/create', validateSchema(testSchema), createTest);
testRouter.get('/tests', getTestsByTerm);

export default testRouter;
