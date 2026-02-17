export interface LoginResponse {
  token: string;
  username: string;
  roles: string[]; // Los que configuramos en JwtUtils del Back
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: string[]; // Opcional según tu lógica de registro
}