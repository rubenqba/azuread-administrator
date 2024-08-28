import { z } from "zod";

export const StatusColorMap: Record<string, "success" | "danger" | "warning" | "default" | "primary" | "secondary"> = {
  buyer: "success",
  staff: "warning",
  admin: "danger",
};

export type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  team?: string;
  avatar?: string;
  roles?: string[];
};

export const UserUpdateValidatorSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  team: z.string().optional(),
  avatar: z.string().optional(),
  roles: z.array(z.enum(['staff', 'buyer'])).default(['buyer']),
});

export const UserEditFormSchema = z.object({
  id: z.string(),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be valid.",
  }),
  team: z.string().optional(),
  isPrivileged: z.coerce.boolean(),
});