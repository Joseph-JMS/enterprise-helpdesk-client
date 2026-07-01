export interface UserResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    roles: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserRequest {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
}

export interface UpdateUserRequest {
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
}

export interface UpdateProfileRequest {
    email: string;
    firstName: string;
    lastName: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
