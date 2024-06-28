import jwt from "jsonwebtoken";
import type { UserToken } from "./types";

export const generateToken = (data: UserToken) => {
	if (!process.env.JWT_SECRET) return;

	const token = jwt.sign(data, process.env.JWT_SECRET);

	return token;
};
