import { Request, Response } from 'express';
import { useCases } from '../mongoDependencyInjection';

export const postUserRegisterController = async (
  req: Request,
  res: Response
) => {
  const { name, password } = req.body;
  await useCases.postUser({ name: name, password: password });
  res.status(201);
};
