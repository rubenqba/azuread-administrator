"use server";

import { Client, clientValidator } from "@model/users";
import { ZodError } from "zod";
import { auth } from "@service/auth";
import ClientService from "@service/clients";
import { FormStatus } from "@model/forms";
import { revalidatePath } from "next/cache";

export async function getClients() {
  const session = await auth();
  const service = new ClientService(session?.accessToken);

  return service.getAll();
}

export async function updateClient(prevState: FormStatus | null, data: FormData): Promise<FormStatus> {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  console.debug(data);
  const form = Object.fromEntries(data.entries());
  const client: Partial<Client> = {
    id: data.get("id")?.toString(),
    firstName: data.get("firstName")?.toString(),
    lastName: data.get("lastName")?.toString(),
    email: data.get("email")?.toString(),
    team: data.get("team")?.toString(),
    roles: data.get("isPrivileged") ? ["Buyer", "Staff"] : ["Buyer"],
  };

  console.log("action data:", form);
  const body = clientValidator.safeParse(form);

  if (!body.success) {
    return {
      status: "error",
      message: (body.error.cause as string) ?? "Invalid form data",
      errors: body.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    };
  }

  // revalidatePath("/users");
  return {
    status: "success",
    message: `Client ${body.data.firstName} ${body.data.lastName} was updated`,
  };
}
