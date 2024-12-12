export interface CreateProductDto {
  name: string;
  description: string;
  categoryId: number;
  image?: string;
  materialId: number;
}

export interface UpdateProductDto {
  name: string;
  description: string;
  categoryId: number;
  image?: string;
  materialId: number;
  price: number;
  status?: boolean;
}
