import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = <T extends string>(password: T): T => {
	const salt = bcrypt.genSaltSync(saltRounds);
	return bcrypt.hashSync(password, salt) as T;
};

export const comparePasswords = <T extends string>(
	plain: T,
	hashed: T,
): boolean => {
	return bcrypt.compareSync(plain, hashed) as boolean;
};
