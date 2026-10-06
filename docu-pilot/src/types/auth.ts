export type AuthUser = {
  id: string;
  username: string;
  email: string;
  emailVerified?: boolean;
};

export type ProfileUser = {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  user: AuthUser;
};

export type LoginResponse = {
  message: string;
  user: AuthUser;
  accessToken: string;
};

export type MessageResponse = {
  message: string;
};

export type ProfileResponse = {
  user: ProfileUser;
};

export type ProfileUpdateRequest = {
  username?: string;
  email?: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};
