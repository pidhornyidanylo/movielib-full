import type { NextFunction, Response, Request } from "express";
import type { CheckResponseError } from "../types/auth.dto";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response<CheckResponseError>,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
