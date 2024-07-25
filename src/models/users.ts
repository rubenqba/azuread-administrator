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
  role?: string[];
};

export const clientValidator = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  team: z.string().optional(),
  avatar: z.string().optional(),
  role: z.array(z.string()).optional(),
});