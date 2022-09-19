import { Router } from 'express';
import {
  createTest,
  getTestsByTeacher,
  getTestsByTerm,
} from '../controllers/testController';
import { validateSchema } from '../middlewares/validateSchema';
import { testSchema } from '../schemas/testSchema';

const testRouter = Router();

testRouter.post('/tests/create', validateSchema(testSchema), createTest);
testRouter.get('/tests/term', getTestsByTerm);
testRouter.get('/tests/teacher', getTestsByTeacher);

export default testRouter;
