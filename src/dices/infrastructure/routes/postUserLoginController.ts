import { Request, Response } from 'express';
import { useCases } from '../mongoDependencyInjection';

export const postUserLoginController = (req: Request, res: Response) => {
  const { name, password } = req.body;
  useCases
    .postUserLogin({
      name: name,
      password: password
    })
    .then((value: unknown) => {
      if (value) res.status(200).json(value);
      else res.status(404).json(null);
    })
    .catch((error) => {
      console.log(error);
    });
};
