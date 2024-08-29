"use server";

import { unwrapObjectIntoFormData } from "@lib/utils";
import { FormStatus } from "@model/forms";
import { Plan, PlanEditFormSchema } from "@model/plans";
import { auth } from "@service/auth";
import PlanService from "@service/plans";
import { revalidatePath } from "next/cache";

export async function getAllPlans(): Promise<{ data: Plan[] | null; error?: string }> {
  const session = await auth();
  try {
    const service = new PlanService(session?.accessToken);
    return { data: await service.getAll() };
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err.message,
        data: null,
      };
    }
  }
  return { data: null, error: "unexpected error" };
}

export async function createPlan(formData: FormData): Promise<FormStatus> {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug("received body: ", formData);
  const form = unwrapObjectIntoFormData(formData);
  console.log("action data:", form);
  const body = PlanEditFormSchema.omit({ id: true }).safeParse(form);

  if (!body.success) {
    console.error("error parsing body");
    return {
      status: "error",
      message: (body.error.cause as string) ?? "Invalid form data",
      errors: body.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  const session = await auth();
  const service = new PlanService(session?.accessToken);

  const { data: dto } = body;
  console.debug("Parsed plan", dto);
  const response = await service.addPlan(dto);
  console.debug(response);

  revalidatePath("/plans");
  return {
    status: "success",
    message: `Plan ${dto.name} was created`,
  };
}

export async function updatePlan(formData: FormData): Promise<FormStatus> {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug("received body: ", formData);
  const form = unwrapObjectIntoFormData(formData);
  console.log("action data:", form);
  const body = PlanEditFormSchema.safeParse(form);

  if (!body.success) {
    console.error("error parsing body");
    return {
      status: "error",
      message: (body.error.cause as string) ?? "Invalid form data",
      errors: body.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  const session = await auth();
  const service = new PlanService(session?.accessToken);

  const { data: dto } = body;
  console.debug("Parsed plan", dto);
  const response = await service.updatePlan(dto.id, dto);
  console.debug(response);

  revalidatePath("/plans");
  return {
    status: "success",
    message: `Plan ${dto.name} was created`,
  };
}

export async function deletePlan(id: string): Promise<FormStatus> {
  console.debug("delete plan: ", id);
  try {
    const session = await auth();
    const service = new PlanService(session?.accessToken);

    await service.deletePlan(id);
    revalidatePath("/plans");
    return {
      status: "success",
      message: "Plan successfully deleted",
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        status: "error",
        message: err.message,
      };
    }
  }
  return { status: "error", message: "unexpected error" };
}
