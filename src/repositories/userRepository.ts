import client from '../database/database';

export async function checkIfEmailIsUsed(email: string) {
  const isUsed = await client.users.findUnique({ where: { email } });
  return isUsed !== null;
}

export async function createUser(email: string, password: string) {
  await client.users.create({
    data: {
      email,
      password,
    },
  });
}
