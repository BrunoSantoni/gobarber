import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('JWT Token is missing', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    console.error(err);
    throw new AppError('Invalid JWT Token', 401);
  }
}
