import { and, eq } from "drizzle-orm";
import { db } from "../../database";
import { brands } from "../../database/schemas";
import { baseService } from "../base";
import type { BrandEntity, CreateBrandDTO, UpdateBrandDTO } from "./types";
import type { UserToken } from "../auth/types";

export const brandService = {
	...baseService(brands),
	create: async (inputBrand: CreateBrandDTO, token: UserToken) => {
		const { code, description } = inputBrand;
		try {
			if (!token.id) {
				throw new Error("userId não informado");
			}

			const codeExists = await db.query.brands.findFirst({
				where: and(eq(brands.code, code), eq(brands.userId, token.id)),
			});

			if (codeExists) {
				throw Error("code já registrado");
			}

			const createdBrand = (
				await db
					.insert(brands)
					.values({ code, description, userId: token.id })
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
