import { Request, Response } from 'express';

import  {finalUseCases}  from './injectionDecider';



export const postUserRegisterController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, password } = req.body;
    const isRegistered = await finalUseCases.postUser({
      name: name,
      password: password
    });
    if (!isRegistered) {
      res.status(401).json(null);
    } else {
      res.status(201).json(isRegistered);
    }
  }catch (err) {
    throw new Error('Error: ' + err)
  } 
};
