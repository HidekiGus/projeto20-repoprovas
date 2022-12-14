import { Request, Response } from 'express';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response) {
  const { email, password, confirmPassword } = req.body;
  await userService.createUser(email, password, confirmPassword);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await userService.signIn(email, password);
  res.status(200).send(token);
}
