import environment from "@lib/environment";
import { parseWWWAuthenticateHeader } from "@lib/utils";
import { Team } from "@model/teams";

class TeamService {
  private accessToken: string;

  constructor(token?: string) {
    if (!token) {
      throw new Error(`Authentication error: missing token`);
    }
    this.accessToken = token;
  }

  async getAll(): Promise<Team[]> {
    const url = `${environment.BACKEND_API_URL}/teams`;
    // console.debug(this.accessToken);
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: "application/json",
      },
    });
    if (res.ok) {
      return await res.json();
    }
    const error = await parseWWWAuthenticateHeader(res.headers.get("WWW-Authenticate"));
    console.error(JSON.stringify(error, null, 2));
    throw new Error(`Authentication error: ${res.statusText}`, {
      cause: error.error_description,
    });
  }

  // getTeamById(id: string): Team | undefined {
  //   return this.teams.find(team => team.id === id);
  // }

  // addTeam(team: Team): void {
  //   if (this.teams.some(t => t.id === team.id)) {
  //     throw new Error(`Team with id ${team.id} already exists`);
  //   }
  //   this.teams.push(team);
  // }

  // updateTeam(id: string, updatedTeam: Partial<Team>): Team | undefined {
  //   const teamIndex = this.teams.findIndex(team => team.id === id);
  //   if (teamIndex === -1) {
  //     throw new Error(`Team with id ${id} not found`);
  //   }

  //   this.teams[teamIndex] = { ...this.teams[teamIndex], ...updatedTeam };
  //   return this.teams[teamIndex];
  // }

  // deleteTeam(id: string): void {
  //   const teamIndex = this.teams.findIndex(team => team.id === id);
  //   if (teamIndex === -1) {
  //     throw new Error(`Team with id ${id} not found`);
  //   }

  //   this.teams.splice(teamIndex, 1);
  // }
}

export default TeamService;
