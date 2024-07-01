import { decodeToken } from "../../modules/auth/jwt";

export const hasAuthentication = (request: Request) => {
	const { headers } = request;

	const { authorization } = headers.toJSON();

	if (!authorization) {
		throw new Error("Usuário não autenticado");
	}
	const tokenString = authorization.split("bearer ")[1];

	const token = decodeToken(tokenString);

	if (!token) {
		throw Error("token inválido");
	}

	return token;
};
