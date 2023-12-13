import { Request, Response } from 'express';
import { useCases } from '../mongoDependencyInjection';
import { useCasesMysql }  from '../sqlDependenyInjection';

export const postUserLoginController = (req: Request, res: Response) => {
  const { name, password } = req.body;
  useCasesMysql
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
