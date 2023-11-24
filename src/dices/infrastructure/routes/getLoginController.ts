import { Request, Response } from 'express';
import path from 'path';

export const getLoginController = (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
};
