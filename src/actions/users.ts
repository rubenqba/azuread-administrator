"use server";

import { UserEditValidatorSchema } from "@model/users";
import { auth } from "@service/auth";
import UserService from "@service/users";
import { FormStatus } from "@model/forms";
import { revalidatePath } from "next/cache";
import { unwrapObjectIntoFormData } from "@lib/utils";

export async function getAllUsers() {
  const session = await auth();
  const service = new UserService(session?.accessToken);

  return service.getAll();
}

export async function createUser(formData: FormData): Promise<FormStatus> {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug("received body: ", formData);
  const form = unwrapObjectIntoFormData(formData);
  console.log("action data:", form);
  const body = UserEditValidatorSchema.omit({ id: true }).safeParse(form);

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
  const service = new UserService(session?.accessToken);

  const { data: dto } = body;
  console.debug("Parsed user", dto);
  const response = await service.createUser(dto);
  console.debug(response);

  revalidatePath("/users");
  return {
    status: "success",
    message: `User ${dto.firstName} ${dto.lastName} was created`,
  };
}

export async function updateUser(formData: FormData): Promise<FormStatus> {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug("received body: ", formData);
  const form = unwrapObjectIntoFormData(formData);
  console.log("action data:", form);
  const body = UserEditValidatorSchema.safeParse(form);

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
  const service = new UserService(session?.accessToken);

  const { data: dto } = body;
  console.debug("Parsed user", dto);
  const response = await service.updateUser(dto.id, dto);
  console.debug(response);

  revalidatePath("/users");
  return {
    status: "success",
    message: `User ${dto.firstName} ${dto.lastName} was updated`,
  };
}


export async function deleteUser(id: string): Promise<FormStatus> {
  console.debug("delete team: ", id);
  try {
    const session = await auth();
    const service = new UserService(session?.accessToken);

    await service.deleteUser(id);
    revalidatePath("/teams");
    return {
      status: "success",
      message: "User successfully deleted",
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
