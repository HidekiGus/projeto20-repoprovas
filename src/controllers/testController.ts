import * as testService from '../services/testService';
import { Request, Response } from 'express';

export async function createTest(req: Request, res: Response) {
  const newTestData = req.body;
  const { authorization } = req.headers;
  await testService.createTest(newTestData, authorization);
  res.sendStatus(201);
}

export async function getTestsByTerm(req: Request, res: Response) {
  const tests: Object = await testService.getTestsByTerm();
  res.status(200).send(tests);
}
