import * as testService from '../services/testService';
import { Request, Response } from 'express';
import { tests } from '@prisma/client';

export async function createTest(req: Request, res: Response) {
  const newTestData: tests = req.body;
  await testService.createTest(newTestData);
  res.sendStatus(201);
}
