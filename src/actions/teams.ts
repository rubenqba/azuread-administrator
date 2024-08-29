'use server';

import { unwrapObjectIntoFormData } from "@lib/utils";
import { FormStatus } from "@model/forms";
import { TeamEditValidatorSchema } from "@model/teams";
import { auth } from "@service/auth";
import TeamService from "@service/teams";
import { revalidatePath } from "next/cache";

export async function getTeams() {
    const session = await auth();
  try {
    const service = new TeamService(session?.accessToken);
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

export async function createTeam(formData: FormData): Promise<FormStatus> {
    // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug("received body: ", formData);
  const form = unwrapObjectIntoFormData(formData);
  console.log("action data:", form);
  const body = TeamEditValidatorSchema.omit({ id: true }).safeParse(form);

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
  const service = new TeamService(session?.accessToken);

  const { data: dto } = body;
  console.debug("Parsed team", dto);
  const response = await service.createTeam(dto);
  console.debug(response);

  revalidatePath("/teams");
  return {
    status: "success",
    message: `Team ${dto.name} was created`,
  };
}

export async function updateTeam(formData: FormData): Promise<FormStatus> {
    // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug("received body: ", formData);
  const form = unwrapObjectIntoFormData(formData);
  console.log("action data:", form);
  const body = TeamEditValidatorSchema.safeParse(form);

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
  const service = new TeamService(session?.accessToken);

  const { data: dto } = body;
  console.debug("Parsed team", dto);
  const response = await service.updateTeam(dto.id, dto);
  console.debug(response);

  revalidatePath("/teams");
  return {
    status: "success",
    message: `Team ${dto.name} was created`,
  };
}

export async function deleteTeam(id: string): Promise<FormStatus> {
    console.debug("delete team: ", id);
  try {
    const session = await auth();
    const service = new TeamService(session?.accessToken);

    await service.deleteTeam(id);
    revalidatePath("/teams");
    return {
      status: "success",
      message: "Team successfully deleted",
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
