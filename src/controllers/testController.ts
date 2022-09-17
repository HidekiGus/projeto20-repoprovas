import * as testService from '../services/testService';
import { Request, Response } from 'express';

export async function createTest(req: Request, res: Response) {
  const newTestData = req.body;
  const { authorization } = req.headers;
  await testService.createTest(newTestData, authorization);
  res.sendStatus(201);
}
