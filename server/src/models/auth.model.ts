import mongoose from "mongoose";
import type { AuthUserModel } from "../types/models.dto";

const authUserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export const authModel = mongoose.model<AuthUserModel>(
	"auth_user",
	authUserSchema,
);
