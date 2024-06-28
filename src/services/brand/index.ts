import { eq } from "drizzle-orm";
import { db } from "../../database";
import { brands } from "../../database/schemas";
import { baseService } from "../base";
import type { BrandEntity, CreateBrandDTO, UpdateBrandDTO } from "./types";

export const brandService = {
	...baseService(brands),
	create: async (inputBrand: CreateBrandDTO) => {
		const { code, description, userId } = inputBrand;
		try {
			if (!userId) {
				throw new Error("userId não informado");
			}

			const codeExists = await db.query.brands.findFirst({
				where: eq(brands.code, code),
			});

			if (codeExists) {
				throw Error("code já registrado");
			}

			const createdBrand = (
				await db
					.insert(brands)
					.values({ code, description, userId })
					.returning()
			)[0];

			return createdBrand;
		} catch (e) {
			throw Error(String(e));
		}
	},
	update: async (
		id: number | undefined,
		updatedBrand: UpdateBrandDTO,
	): Promise<BrandEntity> => {
		try {
			if (!id) {
				throw new Error("id nulo");
			}

			const updatedValue = (
				await db
					.update(brands)
					.set({ description: updatedBrand.description })
					.where(eq(brands.id, id))
					.returning()
			)[0];

			return updatedValue;
		} catch (e) {
			throw Error();
		}
	},
};
