import { Request, Response } from 'express';
import { useCases } from '../mongoDependencyInjection';

export const postUserLoginController = async (req: Request, res: Response) => {
  try{
  const { name, password } = req.body;
  useCases
    .postUserLogin({
      name: name,
      password: password
    })
    .then((value: unknown) => {
      if (value) res.status(200).send(value);
      else res.status(404).send(value);
    })
    .catch((error) => {
      console.log(error);
    });
  } catch (err) {
    throw new Error('Error:  ' + err)
  }
};
