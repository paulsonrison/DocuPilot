import { profileApi } from "@/src/lib/api/profile.api";
import type { ChangePasswordRequest, ProfileUpdateRequest } from "@/src/types/auth";

export const profileService = {
  get: () => profileApi.get(),
  update: (payload: ProfileUpdateRequest) => profileApi.update(payload),
  changePassword: (payload: ChangePasswordRequest) => profileApi.changePassword(payload),
};
