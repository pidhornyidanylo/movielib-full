import type { ResponseSuccess } from "./index.dto";
import type { JwtPayload } from "jsonwebtoken";

export type User = {
  id: string;
  email: string;
};

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type RegisterRequestBody = {
  email: string;
  password: string;
};

export type AuthResponseSuccess = ResponseSuccess & {
  user: User;
};

export type CheckResponseSuccess = {
  authenticated: true;
  user: string | JwtPayload | undefined;
};

export type CheckResponseError = {
  authenticated: false;
};
