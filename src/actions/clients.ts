"use server";

import { Client, UserUpdateValidatorSchema } from "@model/users";
import { z, ZodError } from "zod";
import { auth } from "@service/auth";
import ClientService from "@service/clients";
import { FormStatus } from "@model/forms";
import { UserEditFormSchema } from "@model/users";
import { revalidatePath } from "next/cache";
import { unwrapObjectIntoFormData } from "@lib/utils";

export async function getClients() {
  const session = await auth();
  const service = new ClientService(session?.accessToken);

  return service.getAll();
}

export async function updateClient(prevState: FormStatus | null, formData: FormData): Promise<FormStatus> {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug('received body: ', formData);
  const form = unwrapObjectIntoFormData(formData);
  console.log("action data:", form);
  const body = UserUpdateValidatorSchema.safeParse(form);

  if (!body.success) {
    console.error('error parsing body');
    return {
      ...prevState,
      status: "error",
      message: (body.error.cause as string) ?? "Invalid form data",
      errors: body.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  const session = await auth();
  const service = new ClientService(session?.accessToken);

  const { data: user } = body;
  console.debug('Parsed user', user);
  const response = await service.updateClient(user.id, user);
  console.debug(response);

  revalidatePath("/users");
  return {
    ...prevState,
    status: "success",
    message: `Client ${user.firstName} ${user.lastName} was updated`,
  };
}
