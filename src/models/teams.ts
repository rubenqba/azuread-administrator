import { z } from "zod";

export type Team = {
  id: string;
  name: string;
  plan: string;
};

export const SubscriptionColorMap: Record<string, "success" | "danger" | "warning" | "default" | "primary" | "secondary"> = {
  startup: "danger",
  growth: "warning",
  enterprise: "success",
};


export const teamValidator = z.object({
  id: z.string(),
  name: z.string(),
  plan: z.string().optional()
});