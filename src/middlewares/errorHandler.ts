import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === 'alreadyUsed') {
    return res.status(409).send(error.message);
  }
  if (error.type === 'unauthorized') {
    return res.status(401).send(error.message);
  }
  if (error.type === 'notFound') {
    return res.status(404).send(error.message);
  }
  if (error.type === 'unprocessableEntity') {
    return res.status(422).send(error.message);
  }
  res.sendStatus(500);
}
