import type { PgTable, TableConfig } from "drizzle-orm/pg-core";
import { db } from "../../database";
import { eq } from "drizzle-orm";
import type { PgTableWithColumns } from "drizzle-orm/pg-core";

export const baseService = <T extends TableConfig>(
	entity: PgTable<T> & PgTableWithColumns<T>,
) => {
	const getAll = async () => {
		const results = await db.select().from(entity);
		return results;
	};
	const getById = async (id: number) => {
		const result = (
			await db.select().from(entity).where(eq(entity.id, id))
		)?.[0];
		return result ?? null;
	};

	const deleteBase = async (id: number) => {
		await db.delete(entity).where(eq(entity.id, id));
	};

	return { getAll, getById, delete: deleteBase };
};
