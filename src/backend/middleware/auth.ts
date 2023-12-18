import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.SECRET_KEY || 'sin secretos';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('Token not found');
    }

    const decoded = jwt.verify(token, secret);
    (req as CustomRequest).token = decoded;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized. Please authenticate');
  }
};