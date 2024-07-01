import createServer from "./server";
import { authController } from "./modules/auth/controller";
import { brandController } from "./modules/brand/controller";
import { productController } from "./modules/product/controller";

export const app = createServer();

authController();
brandController();
productController();

app.onError((e) => {
	return { erro: String(e) };
});

const server = app.start();

console.log(`Server running on http://${server.hostname}:${server.port}`);
