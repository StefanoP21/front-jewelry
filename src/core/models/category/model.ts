export interface CategoryListResponse {
  data: Category[];
}

export interface CategoryResponse {
  data: Category;
}

export interface Category {
  id: number;
  name: string;
}
