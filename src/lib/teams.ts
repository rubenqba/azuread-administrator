'use server';

import { auth } from "@service/auth";
import TeamService from "@service/teams";

export async function getTeams() {
    const session = await auth();
    const service = new TeamService(session?.accessToken);

    return service.getAll();
}