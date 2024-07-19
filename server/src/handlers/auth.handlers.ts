import type { Request, Response } from "express";
import { authModel } from "../models/auth.model";
import type {
  AuthResponseSuccess,
  CheckResponseError,
  CheckResponseSuccess,
  LoginRequestBody,
  RegisterRequestBody,
} from "../types/auth.dto";
import type { ResponseError, ResponseSuccess } from "../types/index.dto";
import type { AuthUserModel } from "../types/models.dto";
import { comparePasswords, hashPassword } from "../utils/hashPassword.util";
import jwt from "jsonwebtoken";

export const authLogin = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response<
    | (ResponseSuccess & {
        token: string;
        email: string;
      })
    | ResponseError
  >
) => {
  const { email, password } = req.body;
  try {
    const userExistsInDB = (await authModel.findOne({
      email,
    })) as AuthUserModel | null;
    if (!userExistsInDB) throw new Error("Wrong credentials!");
    const passwordsMatch = comparePasswords(password, userExistsInDB.password);
    if (!passwordsMatch) throw new Error("Wrong credentials!");
    const token = jwt.sign({ email }, process.env.SECRET_KEY as string, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: "Successfully logged in!", token, email: userExistsInDB.email });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const authRegister = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response<AuthResponseSuccess | ResponseError>
) => {
  const { email, password } = req.body;
  try {
    const userExistsInDB = (await authModel.findOne({
      email,
    })) as AuthUserModel | null;
    if (userExistsInDB) throw new Error("Email already in use.");
    const hashedPassword = hashPassword(password);
    const newUser = new authModel({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: "User has been created.",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const authCheck = (
  req: Request,
  res: Response<CheckResponseSuccess | CheckResponseError>
) => {
  res.status(200).json({ authenticated: true, user: req.user });
};
