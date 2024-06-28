ALTER TABLE "product_images" DROP CONSTRAINT "product_images_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "brands" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "product_images" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "price" real NOT NULL;--> statement-breakpoint
ALTER TABLE "product_images" DROP COLUMN IF EXISTS "user_id";