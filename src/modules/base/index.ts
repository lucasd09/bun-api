import type { PgTable, TableConfig } from "drizzle-orm/pg-core";
import { db } from "../../database";
import { and, eq } from "drizzle-orm";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";
import type { UserToken } from "../auth/types";

export const baseService = <T extends TableConfig>(
	entity: PgTable<T> & PgTableWithColumns<T>,
) => {
	const getAll = async (token: UserToken) => {
		const results = await db
			.select()
			.from(entity)
			.where(eq(entity.userId, token.id));
		return results;
	};
	const getById = async (id: number, token: UserToken) => {
		const result = (
			await db
				.select()
				.from(entity)
				.where(and(eq(entity.id, id), eq(entity.userId, token.id)))
		)?.[0];
		return result ?? null;
	};

	const deleteBase = async (id: number) => {
		await db.delete(entity).where(eq(entity.id, id));
	};

	return { getAll, getById, delete: deleteBase };
};
