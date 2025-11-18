import { z } from "zod"

export const email = z.email("Enter valid email.")
export const password = z
  .string()
  .regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
    "Password must contain one uppercase letter, one number, one special character, and be at least 6 characters long."
  )

export const signupSchema = z.object({
  fullname: z.string().min(3, "Fullname must be at least 3 characters long."),
  email,
  mobile: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Enter a valid mobile number, +918551.... format"),
  password,
}).strict()

export const loginSchema = z.object({
  email,
  password,
}).strict()

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
