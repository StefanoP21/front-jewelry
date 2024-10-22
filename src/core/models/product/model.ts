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
  category: {
    id: number;
    name: string;
  };
  image: string;
  material: string;
  price: number;
  stock: number;
}
