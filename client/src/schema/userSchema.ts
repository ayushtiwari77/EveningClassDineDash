import { z } from "zod";

export const userSignupSchema = z.object({
  fullname: z.string().min(3, "Fullname is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
  contact: z
    .string()
    .min(10, { message: "Contact number at least 10digit" })
    .max(10, "contact number atmost 10 digit"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "password must be atleast 6 characters"),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;
