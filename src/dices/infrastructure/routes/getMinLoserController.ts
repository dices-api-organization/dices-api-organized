import { Response } from 'express';
import  {finalUseCases}  from './injectionDecider';

export const getMinLoserController = (res: Response) => {
    
  finalUseCases
    .findMinLoser()
    .then((value: unknown) => {
      if (value) res.status(200).send(value);
      else res.status(404).send(value);
    })
    .catch((error) => {
      console.log(error);
    });
};
