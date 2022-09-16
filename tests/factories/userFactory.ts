import { faker } from '@faker-js/faker';

export async function createUser() {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const confirmPassword = password;
  return {
    email,
    password,
    confirmPassword,
  };
}
