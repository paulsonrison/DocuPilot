import { apiRequest } from "@/src/lib/api/client";
import type {
  LoginRequest,
  LoginResponse,
  MessageResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/src/types/auth";

export const authApi = {
  register(payload: RegisterRequest) {
    return apiRequest<RegisterResponse>("/auth/register", {
      method: "POST",
      body: payload,
    });
  },

  login(payload: LoginRequest) {
    return apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: payload,
      skipSessionClearOn401: true,
    });
  },

  verifyEmail(token: string) {
    return apiRequest<MessageResponse>("/auth/verify-email", {
      method: "POST",
      body: { token },
    });
  },

  resendVerification(email: string) {
    return apiRequest<MessageResponse>("/auth/resend-verification", {
      method: "POST",
      body: { email },
    });
  },

  forgotPassword(email: string) {
    return apiRequest<MessageResponse>("/auth/forgot-password", {
      method: "POST",
      body: { email },
    });
  },

  resetPassword(token: string, password: string) {
    return apiRequest<MessageResponse>("/auth/reset-password", {
      method: "POST",
      body: { token, password },
    });
  },
};
