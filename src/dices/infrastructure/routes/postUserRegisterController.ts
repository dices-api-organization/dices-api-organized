import { Request, Response } from 'express';

export const postUserRegisterController = async (req: Request, res: Response) => {
  const user = req.body.user;
  const password = req.body.password;
};
