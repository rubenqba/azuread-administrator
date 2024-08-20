'use server';

import { auth } from "@service/auth";
import ClientService from "@service/clients";

export async function getClients() {
    const session = await auth();
    const service = new ClientService(session?.accessToken);

    return service.getAll();
}