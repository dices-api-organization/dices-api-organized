import { Request, Response } from 'express';


import  {finalUseCases}  from './injectionDecider';



export const postUserRegisterController = async (
  req: Request,
  res: Response
) => {
  const { name, password } = req.body;
  const isRegistered = await finalUseCases.postUser({
    name: name,
    password: password
  });
  if (!isRegistered) {
    res.status(201).json(name);
  } else {
    res.status(409).json(name);
  }
};
