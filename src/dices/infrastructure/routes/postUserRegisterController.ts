import { Request, Response } from 'express';
import { useCases } from '../mongoDependencyInjection';
import { useCasesMysql }  from '../sqlDependenyInjection';

export const postUserRegisterController = async (
  req: Request,
  res: Response
) => {
  const { name, password } = req.body;
  const isRegistered = await useCasesMysql.postUser({
    name: name,
    password: password
  });
  if (!isRegistered) {
    res.status(201).json(name);
  } else {
    res.status(409).json(name);
  }
};
