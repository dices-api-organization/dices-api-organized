import { Request, Response } from 'express';
import  {finalUseCases}  from './injectionDecider';



export const deleteAllGamesPlayerController = async (
  req: Request,
  res: Response) => {
  
  finalUseCases
  .deleteAllGamesFromPlayer(req.body._id)
  .then((value: unknown) => {
    if (value) res.status(200).send(value);
    else res.status(404).send(value);
  })
  .catch((error: any) => {
    console.log(error);
  });
};
