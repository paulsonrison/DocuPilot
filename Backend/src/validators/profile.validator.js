const { z } = require("zod");

const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .optional(),

    email: z
      .string()
      .email("Please provide a valid email address")
      .optional()
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided"
    }
  );

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Current password is required"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long")
  })
  .refine(
    (data) => data.currentPassword !== data.newPassword,
    {
      message: "New password must be different from current password",
      path: ["newPassword"]
    }
  );

module.exports = {
  updateProfileSchema,
  changePasswordSchema
};