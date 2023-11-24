/* import { type Response, type Request } from 'express';
import { UseCase } from '../../application/UseCase';

export const getPlayersController = async (_req: Request, res: Response) => {
  const players = await UseCase.getPlayers();

  res.status(200).json({ players });
};

//class UseCase with only 1 method to test controller
 */