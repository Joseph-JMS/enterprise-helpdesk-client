export interface AuthResponse {
  accessToken: string;
  username: string;
  roles: string[];
  expiresIn: number;
}

export interface AuthUser {
  username: string;
  roles: string[];
  expiresAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}