import { app } from "../..";
import { loginService } from "./login";
import { registerService } from "./register";

export const authController = () =>
	app
		.post("/login", async (props) => {
			const { request } = props;
			return await loginService(request);
		})
		.post("/register", async (props) => {
			const { request } = props;
			return await registerService(request);
		});
