import * as testRepository from '../repositories/testRepository';
import { findUserById } from '../repositories/userRepository';
import { getAuthorization } from '../utils/getAuthorization';
import { resolveJWT } from '../utils/jwtResolver';

export async function createTest(newTest, authorization: string) {
  if (!authorization) {
    throw {
      type: 'unauthorized',
      message: 'Your token is not valid. Please sign in again!',
    };
  }
  const jwtToken = await getAuthorization(authorization);
  const userId = await resolveJWT(jwtToken);
  await findUserById(userId);
  const teacherExists: Boolean = await testRepository.checkIfTeacherIdExists(
    newTest.teacherId
  );
  const categoryExists: Boolean = await testRepository.checkIfCategoryIdExists(
    newTest.categoryId
  );
  const disciplineExists: Boolean =
    await testRepository.checkIfDisciplineIdExists(newTest.disciplineId);
  if (!teacherExists || !categoryExists || !disciplineExists) {
    throw {
      type: 'unprocessableEntity',
      message: 'Check fields and try again!',
    };
  }
  const teacherDisciplineId = await testRepository.findTeachersDisciplinesId(
    newTest.teacherId,
    newTest.disciplineId
  );

  console.log(teacherDisciplineId);

  if (teacherDisciplineId === 0) {
    throw {
      type: 'notFound',
      message: 'There is not a discipline with this teacher!',
    };
  }
  console.log('ta aqui');
  const newTestData = {
    name: newTest.name,
    pdfUrl: newTest.pdfUrl,
    categoryId: newTest.categoryId,
    teacherDisciplineId,
  };
  await testRepository.createTest(newTestData);
}

export async function getTestsByTerm() {
  const tests = await testRepository.getTestsByTerm();
  return tests;
}
