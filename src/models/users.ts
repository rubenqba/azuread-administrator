import { z } from "zod";
import { TeamSummary } from "./teams";

export const StatusColorMap: Record<string, "success" | "danger" | "warning" | "default" | "primary" | "secondary"> = {
  buyer: "success",
  staff: "warning",
  admin: "danger",
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  team?: TeamSummary;
  avatar?: string;
  roles?: string[];
  createdAt: string;
  // createdBy: string;
  // updatedAt: string;
  // updatedBy: string;
};

export const UserEditValidatorSchema = z.object({
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
  avatar: z.string().optional(),
  roles: z.array(z.enum(["staff", "buyer"])).default(["buyer"]),
});

export const UserEditFormSchema = UserEditValidatorSchema.omit({ roles: true }).extend({
  isPrivileged: z.boolean().default(false),
});

export type UpdateUserDto = z.infer<typeof UserEditValidatorSchema>;
export type CreateUserDto = Omit<UpdateUserDto, "id">;
