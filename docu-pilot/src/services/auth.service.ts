import { authApi } from "@/src/lib/api/auth.api";
import type { LoginRequest, RegisterRequest } from "@/src/types/auth";

export const authService = {
  register: (payload: RegisterRequest) => authApi.register(payload),
  login: (payload: LoginRequest) => authApi.login(payload),
  verifyEmail: (token: string) => authApi.verifyEmail(token),
  resendVerification: (email: string) => authApi.resendVerification(email),
  forgotPassword: (email: string) => authApi.forgotPassword(email),
  resetPassword: (token: string, password: string) => authApi.resetPassword(token, password),
};
