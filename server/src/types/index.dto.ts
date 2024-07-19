import type { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export type ResponseError = {
	error: string;
};

export type ResponseSuccess = {
	success: string;
};
