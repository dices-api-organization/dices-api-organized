import { Response, Request } from 'express';
import  {finalUseCases}  from './injectionDecider';

export const getPlayersAndRatingsController = (req: Request, res: Response) => {
    
  finalUseCases
    .allPlayersAndRatings()
    .then((value: unknown) => {
      if (value) res.status(200).send(value);
      else res.status(404).send(value);
    })
    .catch((error) => {
      console.log(error);
    });
};
