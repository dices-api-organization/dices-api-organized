import { Request, Response } from 'express';
import { useCases } from '../mongoDependencyInjection';

export const getUserLoginController = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const isRegistered = await useCases.getUserLogin({
    name: name,
    password: password
  });
  if (!isRegistered) {
    console.log('no registered');
    res.status(404).json(name);
  } else {
    console.log('you can play!!');
    res.status(200).json(name);
  }
};
