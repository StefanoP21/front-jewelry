export interface ProductListResponse {
  data: Product[];
}

export interface ProductResponse {
  data: Product;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: number;
  image: string;
  material: string;
  price: number;
  stock: number;
}
