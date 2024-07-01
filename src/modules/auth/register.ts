import { eq } from "drizzle-orm";
import { db } from "../../database";
import { users } from "../../database/schemas";
import type { AuthDTO } from "./types";
import { generateToken } from "./jwt";

export const registerService = async (req: Request) => {
	const { email, password, name }: AuthDTO = await req.json();

	const userFound = await db.query.users.findFirst({
		where: eq(users.email, email),
	});

	if (userFound) {
		throw new Error("usuario ja cadastrado");
	}

	const hashedPassword = await Bun.password.hash(password);

	try {
		const createdUsers = await db
			.insert(users)
			.values({ email: email, name: name || "", password: hashedPassword })
			.returning()
			.execute();

		const createdUser = createdUsers[0];

		const userToken = {
			id: createdUser.id,
			email: createdUser.email,
			name: createdUser.name,
		};
		const token = generateToken(userToken);

		return { token, userToken };
	} catch {
		throw new Error("Register error");
	}
};
