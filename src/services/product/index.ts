import { eq } from "drizzle-orm";
import { db } from "../../database";
import { products } from "../../database/schemas";
import { baseService } from "../base";
import type {
	CreateProductDTO,
	UpdateProductDTO,
	ProductEntity,
} from "./types";

export const productService = {
	...baseService(products),
	create: async (inputProduct: CreateProductDTO) => {
		const { code, name, userId, price, brandId } = inputProduct;
		try {
			if (!userId) {
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
					.values({ code, name, price, userId, brandId })
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
					.set({ name: updatedProduct.name })
					.where(eq(products.id, id))
					.returning()
			)[0];

			return updatedValue;
		} catch (e) {
			throw Error();
		}
	},
};
