import { faker } from '@faker-js/faker';

export async function createTest() {
  const newTest = {
    name: faker.lorem.word(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    disciplineId: 3,
    teacherId: 1,
  };

  return newTest;
}
