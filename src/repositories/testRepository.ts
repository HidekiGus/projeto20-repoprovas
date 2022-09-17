import client from '../database/database';

export async function createTest(newTestData) {
  await client.tests.create({ data: newTestData });
}

export async function checkIfTeacherIdExists(
  teacherId: number
): Promise<Boolean> {
  const teacher = await client.teachers.findUnique({
    where: { id: teacherId },
  });
  return teacher !== null;
}

export async function checkIfCategoryIdExists(
  categoryId: number
): Promise<Boolean> {
  const category = await client.categories.findUnique({
    where: { id: categoryId },
  });
  return category !== null;
}

export async function checkIfDisciplineIdExists(
  disciplineId: number
): Promise<Boolean> {
  const discipline = await client.disciplines.findUnique({
    where: { id: disciplineId },
  });
  return discipline !== null;
}

export async function findTeachersDisciplinesId(
  teacherId: number,
  disciplineId: number
) {
  const result = await client.teachersDisciplines.findMany({
    where: { teacherId, disciplineId },
  });
  return result[0].id;
}
