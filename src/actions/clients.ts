import { Client, clientValidator } from "@model/users";
import { ZodError } from "zod";

export async function updateClient(data: FormData) {
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const client: Partial<Client> = {
    id: data.get("id")?.toString(),
    firstName: data.get("firstName")?.toString(),
    lastName: data.get("lastName")?.toString(),
    email: data.get("email")?.toString(),
    team: data.get("teamId")?.toString(),
    role: data.get("isPrivileged") ? ["Buyer", "Staff"] : ["Buyer"],
  };

  console.log("action data:", client);

  try {
    const { id, firstName, lastName, email, team, role } = clientValidator.parse(data);

    return {
      status: "success",
      message: `Client ${client.firstName} ${client.lastName} was updated`,
    };
  } catch (e) {
    // In case of a ZodError (caused by our validation) we're adding issues to our response
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data",
        errors: e.issues.map((issue) => ({
          path: issue.path.join("."),
          message: `Server validation: ${issue.message}`,
        })),
      };
    }
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
