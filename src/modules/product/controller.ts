import { productService } from "./service";
import { hasAuthentication } from "../../guards/authentication/has-authentication";
import type { CreateProductDTO, UpdateProductDTO } from "./types";
import { app } from "../..";
import { allocUnsafe } from "bun";

export const productController = () =>
	app
		.get("/product", async (props) => {
			const { request } = props;

			const token = hasAuthentication(request);
			return await productService.getAll(token);
		})
		.get("/product/:id", async (props) => {
			const { request, params } = props;

			const token = hasAuthentication(request);
			return await productService.getById(
				Number.parseInt(params?.id || ""),
				token,
			);
		})
		.post("/product", async (props) => {
			const { request } = props;
			const body: CreateProductDTO = await request.json();

			const token = hasAuthentication(request);
			return await productService.create(body, token);
		})
		.put("/product/:id", async (props) => {
			const { request, params } = props;
			const body: UpdateProductDTO = await request.json();

			const token = hasAuthentication(request);
			return await productService.update(
				Number.parseInt(params?.id || ""),
				body,
			);
		})
		.delete("/product/:id", async (props) => {
			const { request, params } = props;

			const token = hasAuthentication(request);
			return await productService.delete(Number.parseInt(params?.id || ""));
		});
