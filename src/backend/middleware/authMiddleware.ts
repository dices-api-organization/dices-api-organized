import { Request, Response, NextFunction } from 'express';
//import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
   if (res.status(200 || 201)) 
        next();
}