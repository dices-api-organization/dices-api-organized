import { Request, Response } from 'express';

import { finalUseCases } from './injectionDecider';

export const putModifyPlayerNameController = async (
  req: Request,
  res: Response
) => {
  const { id, name } = req.body;
  finalUseCases
    .modifyPlayerName(id, name)
    .then((value: boolean) => {
      if (value) res.status(200).send(value);
      else res.status(404).send(value);
    })
    .catch((error) => {
      console.log(error);
    });
};
