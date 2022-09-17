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

export async function checkUserByEmail(email: string): Promise<object> {
  const user = await client.users.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function getPasswordByEmail(email: string): Promise<string> {
  const userData = await client.users.findUnique({
    where: {
      email,
    },
  });
  const encryptedPassword = userData.password;
  return encryptedPassword;
}

export async function getUserByEmail(email: string) {
  const user = await client.users.findUnique({
    where: {
      email,
    },
  });
  return user.id;
}
