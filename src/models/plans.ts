import { string, z } from "zod";

export type Plan = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export type CreatePlanDto = {
  name: string;
  description?: string;
};

export const PlanEditFormSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Plan name must be at least 2 characters.",
  }),
  description: z.string().optional(),
});
