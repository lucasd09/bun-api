import { brandService } from "./service";
import type { CreateBrandDTO, UpdateBrandDTO } from "./types";
import { app } from "../../index";
import { hasAuthentication } from "../../guards/authentication/has-authentication";
export const brandController = () =>
	app
		.get("/brand", async (props) => {
			const { request } = props;

			const token = hasAuthentication(request);
			return await brandService.getAll(token);
		})
		.get("/brand/:id", async (props) => {
			const { request, params } = props;

			const token = hasAuthentication(request);
			return await brandService.getById(
				Number.parseInt(params?.id || ""),
				token,
			);
		})
		.post("/brand", async (props) => {
			const { request } = props;
			const body: CreateBrandDTO = await request.json();

			const token = hasAuthentication(request);
			return await brandService.create(body, token);
		})
		.put("/brand/:id", async (props) => {
			const { request, params } = props;
			const body: UpdateBrandDTO = await request.json();

			hasAuthentication(request);
			return await brandService.update(Number.parseInt(params?.id || ""), body);
		})
		.delete("/brand/:id", async (props) => {
			const { request, params } = props;

			hasAuthentication(request);
			return await brandService.delete(Number.parseInt(params?.id || ""));
		});
