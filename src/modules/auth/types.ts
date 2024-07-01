export type AuthDTO = {
	email: string;
	name?: string;
	password: string;
};

export type UserToken = {
	id: number;
	email: string;
	name: string;
};
