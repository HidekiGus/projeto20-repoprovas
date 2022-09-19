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

export async function checkIfDisciplineIdExists(disciplineId: number) {
  const discipline = await client.disciplines.findUnique({
    where: { id: disciplineId },
  });
  console.log(discipline !== null);
  return discipline !== null;
}

export async function findTeachersDisciplinesId(
  teacherId: number,
  disciplineId: number
) {
  const result: number =
    await client.$executeRaw`SELECT td.id as Id FROM "teachersDisciplines" td WHERE td."teacherId"=${teacherId} AND td."disciplineId"=${disciplineId};`;
  return result;
}

export async function getTestsByTerm() {
  const terms = await client.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          teachersDisciplines: {
            select: {
              tests: {
                select: {
                  name: true,
                  pdfUrl: true,
                },
              },
              teachers: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return terms;
}
