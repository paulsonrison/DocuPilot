const {z}=require('zod');

const registerValidator=z.object({
    username :z
    .string()
    .min(3, "username must at least 3 characters long"),
    email :z
    .email("Please provide a valid email address"),
    password:z
    .string()
    .min(8,"Password must be at least 8 characters long")
})

const loginValidator = z.object({
    email:z
        .email("Please provide a valid email address"),
    password:z
        .string()
        .min(1,"Password is required")
    })

module.exports={registerValidator,loginValidator};