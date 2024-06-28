import { relations } from "drizzle-orm";
import { real } from "drizzle-orm/pg-core";
import { date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const baseColumns = {
	id: serial("id").primaryKey(),
};

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	password: text("password").notNull(),
	createdAt: date("created_at").defaultNow(),
});

export const brands = pgTable("brands", {
	id: serial("id").primaryKey(),
	code: integer("code").notNull(),
	description: text("description").notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	createdAt: date("created_at").defaultNow(),
});

export const products = pgTable("products", {
	id: serial("id").primaryKey(),
	code: integer("code").notNull(),
	name: text("name").notNull(),
	price: real("price").notNull(),
	createdAt: date("created_at").defaultNow(),
	brandId: integer("brand_id")
		.notNull()
		.references(() => brands.id),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
});

export const productImages = pgTable("product_images", {
	id: serial("id").primaryKey(),
	url: text("url").notNull(),
	productId: integer("product_id")
		.notNull()
		.references(() => products.id),
	createdAt: date("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
	brands: many(brands),
	products: many(products),
	productImages: many(productImages),
}));

export const brandsRelations = relations(brands, ({ one, many }) => ({
	user: one(users, {
		fields: [brands.userId],
		references: [users.id],
	}),
	products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
	user: one(users, {
		fields: [products.userId],
		references: [users.id],
	}),
	brand: one(brands, {
		fields: [products.brandId],
		references: [brands.id],
	}),
	productImages: many(productImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
	product: one(products, {
		fields: [productImages.productId],
		references: [products.id],
	}),
}));
