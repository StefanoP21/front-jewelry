export interface LoginDto {
  dni: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  lastname: string;
  dni: string;
  password: string;
  role: string;
}

export interface UpdatePasswordDto {
  dni: string;
  password: string;
  newPassword: string;
}
