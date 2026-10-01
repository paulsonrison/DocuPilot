const { z } = require("zod");

const updateProfileSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .optional(),

    email: z
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

module.exports = {
  updateProfileSchema
};