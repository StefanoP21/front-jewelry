export interface CreateProductDto {
  name: string;
  description: string;
  categoryId: string;
  image?: string;
  material: string;
  price: number;
  stock: number;
}
