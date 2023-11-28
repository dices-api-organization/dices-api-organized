import { Request, Response } from 'express';
import { useCases } from '../mongoDependencyInjection';
import { isRegistered } from './isRegistered';
export const postUserLoginController = async (req: Request, _res: Response) => {
  isRegistered(req);
};

