import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 6 characters!"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters!"),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;

export default registerSchema;
