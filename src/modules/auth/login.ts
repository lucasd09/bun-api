import { eq } from "drizzle-orm";
import { db } from "../../database";
import type { AuthDTO } from "./types";
import { users } from "../../database/schemas";
import { generateToken } from "./jwt";

export const loginService = async (req: Request) => {
	const { email, password }: AuthDTO = await req.json();

	const userFound = await db.query.users.findFirst({
		where: eq(users.email, email),
	});

	if (!userFound) {
		throw new Error("usuario não encontrado");
	}

	const passwordMatches = await Bun.password.verify(
		password,
		userFound.password,
	);
	if (!passwordMatches) {
		throw new Error("senha incorreta");
	}

	const userToken = {
		id: userFound.id,
		email: userFound.email,
		name: userFound.name,
	};
	const token = generateToken(userToken);

	return { token, userToken };
};
