import { tests } from '@prisma/client';
import client from '../database/database';

export async function createTest(newTestData: tests) {
  await client.tests.create({ data: newTestData });
}
