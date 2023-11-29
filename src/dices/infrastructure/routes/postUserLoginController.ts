import { Request, Response } from 'express';
import { useCases } from '../mongoDependencyInjection';

export const postUserLoginController = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const isRegistered = await useCases.postUserLogin({
    name: name,
    password: password
  });
  if (!isRegistered?.name || !isRegistered?.password) {
    console.log('no registered');
    res.status(400).send({
      message: 'User not found.'
    });
  } else {
    console.log('you can play!!');
    res.status(200).send({
      message: 'User Logged In'
    });
  }
};
