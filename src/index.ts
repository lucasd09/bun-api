import createServer from "./server";
import { loginService } from "./services/auth/login";
import { registerService } from "./services/auth/register";
import { brandService } from "./services/brand";
import type { CreateBrandDTO, UpdateBrandDTO } from "./services/brand/types";
import { productService } from "./services/product";
import type {
	CreateProductDTO,
	UpdateProductDTO,
} from "./services/product/types";

const app = createServer();

app
	.post("/login", async (props) => {
		const { request } = props;
		return await loginService(request);
	})
	.post("/register", async (props) => {
		const { request } = props;
		return await registerService(request);
	})
	.get("/brand", async (props) => {
		return await brandService.getAll();
	})
	.get("/brand/:id", async (props) => {
		const { params } = props;

		return await brandService.getById(Number.parseInt(params?.id || ""));
	})
	.post("/brand", async (props) => {
		const { request } = props;
		const body: CreateBrandDTO = await request.json();
		return await brandService.create(body);
	})
	.put("/brand/:id", async (props) => {
		const { request, params } = props;
		const body: UpdateBrandDTO = await request.json();

		return await brandService.update(Number.parseInt(params?.id || ""), body);
	})
	.delete("/brand/:id", async (props) => {
		const { params } = props;

		return await brandService.delete(Number.parseInt(params?.id || ""));
	})
	.get("/product", async (props) => {
		return await productService.getAll();
	})
	.get("/product/:id", async (props) => {
		const { params } = props;

		return await productService.getById(Number.parseInt(params?.id || ""));
	})
	.post("/product", async (props) => {
		const { request } = props;
		const body: CreateProductDTO = await request.json();
		return await productService.create(body);
	})
	.put("/product/:id", async (props) => {
		const { request, params } = props;
		const body: UpdateProductDTO = await request.json();

		return await productService.update(Number.parseInt(params?.id || ""), body);
	})
	.delete("/product/:id", async (props) => {
		const { params } = props;

		return await productService.delete(Number.parseInt(params?.id || ""));
	});

app.onError((e) => {
	return { erro: String(e) };
});

const server = app.start();

console.log(`Server running on http://${server.hostname}:${server.port}`);
