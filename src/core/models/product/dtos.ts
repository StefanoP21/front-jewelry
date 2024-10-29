export interface CreateProductDto {
  name: string;
  description: string;
  categoryId: number;
  image?: string;
  material: string;
}

export interface UpdateProductDto {
  name: string;
  description: string;
  categoryId: number;
  image?: string;
  material: string;
  price: number;
}
