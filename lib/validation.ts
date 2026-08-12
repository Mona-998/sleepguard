import { z } from "zod";

// Account creation
export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Use 8 or more characters")
      .regex(/[A-Za-z]/, "Include at least one letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type SignupData = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});
export type SigninData = z.infer<typeof signinSchema>;

// Step 1 — personal details
export const detailsSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\s-]+$/, "Phone number can only contain digits, +, spaces, or -"),
});
export type DetailsData = z.infer<typeof detailsSchema>;

// Step 2 — location & date
export const UAE_EMIRATES = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
] as const;

export const locationSchema = z.object({
  emirate: z.enum(UAE_EMIRATES, { errorMap: () => ({ message: "Select an emirate" }) }),
  address: z.string().trim().min(5, "Enter your delivery address"),
});
export type LocationData = z.infer<typeof locationSchema>;

// Full order payload (details + location), validated again server-side before payment
export const orderSchema = detailsSchema.merge(locationSchema);
export type OrderData = z.infer<typeof orderSchema>;
