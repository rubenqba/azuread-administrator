import { z } from "zod";
import { PlanSummary } from "./plans";

export type Team = {
  id: string;
  name: string;
  plan?: PlanSummary;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export const SubscriptionColorMap: Record<string, "success" | "danger" | "warning" | "default" | "primary" | "secondary"> = {
  startup: "danger",
  growth: "warning",
  enterprise: "success",
};


export const TeamEditValidatorSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Team name must be at least 2 characters.",
  }),
  plan: z.string().optional()
});

export type UpdateTeamDto = z.infer<typeof TeamEditValidatorSchema>;
export type CreateTeamDto = Omit<UpdateTeamDto, "id">;

export type TeamSummary = Pick<Team, "id" | "name">;
