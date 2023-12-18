import { Request, Response } from 'express';


import  {finalUseCases}  from './injectionDecider';



export const putModifyPlayerNameController = async (
  req: Request,
  res: Response) => {
  
  finalUseCases
  .modifyPlayerName(req.body, req.body.player_name)
  .then((value: unknown) => {
    if (value) res.status(200).send(value);
    else res.status(404).send(value);
  })
  .catch((error) => {
    console.log(error);
  });
};
