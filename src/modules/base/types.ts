import type { NotNull } from "drizzle-orm";
import type { PgSerialBuilderInitial } from "drizzle-orm/pg-core";
import type { PgTable, TableConfig } from "drizzle-orm/pg-core";

export type BaseType = { id: NotNull<PgSerialBuilderInitial<"id">> };

export type BaseEntityType<T extends TableConfig> = PgTable<T> & BaseType;

export type BaseDTO = {
	userId?: number;
};

export type BaseEntity = BaseDTO & {
	id: number;
	createdAt: string | null;
};
