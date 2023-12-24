import { Request, Response } from 'express';


import  {finalUseCases}  from './injectionDecider';



export const postPlayGameController = async (
  req: Request,
  res: Response) => {
    const {id} = req.body
  finalUseCases.playGame(id)
  .then((value: unknown) => {
    if (value) res.status(200).send(value);
    else res.status(404).send(value);
  })
  .catch((error) => {
    console.log(error);
  });
};
