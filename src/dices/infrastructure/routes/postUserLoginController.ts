import { Request, Response } from 'express';
import  {finalUseCases}  from './injectionDecider';

export const postUserLoginController = (req: Request, res: Response) => {
  const { name, password } = req.body;
  finalUseCases
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
};
