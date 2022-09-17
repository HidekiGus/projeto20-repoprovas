import * as userRepository from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export async function signIn(email: string, password: string) {
  const userExists = await userRepository.checkUserByEmail(email);
  if (userExists === null) {
    // If there are no users with this email
    throw {
      type: 'unauthorized',
      message: 'Check email and password and try again!',
    };
  } else {
    // If a user with this email exists
    const encryptedPassword = await userRepository.getPasswordByEmail(email);
    const doPasswordsCheck = bcrypt.compareSync(password, encryptedPassword);
    if (!doPasswordsCheck) {
      throw {
        type: 'unauthorized',
        message: 'Check email and password and try again!',
      };
    }
    return await generateJWT(email);
  }
}

export async function generateJWT(email: string) {
  const userId = await userRepository.getUserByEmail(email);
  const data = { userId };
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(data, secretKey);
  return token;
}
