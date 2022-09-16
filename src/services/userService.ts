import * as userRepository from '../repositories/userRepository';
import bcrypt from 'bcrypt';

export async function createUser(
  email: string,
  password: string,
  confirmPassword: string
) {
  const isUsed = await userRepository.checkIfEmailIsUsed(email);
  if (isUsed) {
    throw { type: 'alreadyUsed', message: 'This email is already being used!' };
  }

  if (password === confirmPassword) {
    const encryptedPassword = bcrypt.hashSync(password, 10);
    await userRepository.createUser(email, encryptedPassword);
  } else {
    throw { type: 'forbidden', message: 'Passwords do not match!' };
  }
}
