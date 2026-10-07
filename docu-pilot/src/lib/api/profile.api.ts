import { apiRequest } from "@/src/lib/api/client";
import type {
  ChangePasswordRequest,
  MessageResponse,
  ProfileResponse,
  ProfileUpdateRequest,
} from "@/src/types/auth";

export const profileApi = {
  get() {
    return apiRequest<ProfileResponse>("/profile", { auth: true });
  },

  update(payload: ProfileUpdateRequest) {
    return apiRequest<ProfileResponse & { message: string }>("/profile", {
      method: "PATCH",
      auth: true,
      body: payload,
    });
  },

  changePassword(payload: ChangePasswordRequest) {
    return apiRequest<MessageResponse>("/profile/password", {
      method: "PATCH",
      auth: true,
      skipSessionClearOn401: true,
      body: payload,
    });
  },
};
