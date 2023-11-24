import { Request, Response } from 'express';

export const getLoginController = (_req: Request, res: Response) => {
  res.sendFile(process.cwd() + '/src/dices/infrastructure/frontend/index.html');
};
