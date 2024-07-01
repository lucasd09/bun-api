import { eq } from "drizzle-orm";
import { db } from "../../database";
import { products } from "../../database/schemas";
import { baseService } from "../base";
import type {
	CreateProductDTO,
	UpdateProductDTO,
	ProductEntity,
} from "./types";
import type { UserToken } from "../auth/types";

export const productService = {
	...baseService(products),
	create: async (inputProduct: CreateProductDTO, token: UserToken) => {
		const { code, name, price, brandId } = inputProduct;
		try {
			if (!token.id) {
				throw new Error("userId não informado");
			}

			const codeExists = await db.query.products.findFirst({
				where: eq(products.code, code),
			});

			if (codeExists) {
				throw Error("code já registrado");
			}

			const createdProduct = (
				await db
					.insert(products)
					.values({ code, name, price, userId: token.id, brandId })
					.returning()
			)[0];

			return createdProduct;
		} catch (e) {
			throw Error(String(e));
		}
	},
	update: async (
		id: number | undefined,
		updatedProduct: UpdateProductDTO,
	): Promise<ProductEntity> => {
		try {
			if (!id) {
				throw new Error("id nulo");
			}

			const updatedValue = (
				await db
					.update(products)
					.set(updatedProduct)
					.where(eq(products.id, id))
					.returning()
			)[0];

			return updatedValue;
		} catch (e) {
			throw Error();
		}
	},
};
