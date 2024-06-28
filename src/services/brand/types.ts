import type { BaseDTO, BaseEntity } from "../base/types";

export type BrandDTO = {
	code: number;
	description: string;
};

export type BrandEntity = BaseEntity & BrandDTO;

export type CreateBrandDTO = BaseDTO & BrandDTO;

export type UpdateBrandDTO = Omit<BrandDTO, "code">;
