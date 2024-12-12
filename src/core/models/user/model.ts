export interface UserListResponse {
  data: Data[];
}

export interface UserResponse {
  data: Data;
}

export interface Data {
  user: User;
  token: string;
}

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  dni: string;
  role: string;
  status: boolean;
}
