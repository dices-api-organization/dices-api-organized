import { Request, Response } from 'express';
import { useCases } from '../mongoDependencyInjection';

export const postUserRegisterController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, password } = req.body;
    const isRegistered = await useCases.postUser({
      name: name,
      password: password
    });
    if (!isRegistered) {
      res.status(401).json(name);
    } else {
      res.status(201).json(name);
    }
  }catch (err) {
    throw new Error('Error: ' + err)
  } 
};
