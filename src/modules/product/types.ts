import type { BaseDTO, BaseEntity } from "../base/types";

export type ProductDTO = {
	code: number;
	name: string;
	price: number;
	brandId: number;
};

export type ProductEntity = BaseEntity & ProductDTO;

export type CreateProductDTO = BaseDTO & ProductDTO;

export type UpdateProductDTO = Omit<ProductDTO, "code">;
