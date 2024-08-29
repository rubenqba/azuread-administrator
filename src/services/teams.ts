import environment from "@lib/environment";
import { parseWWWAuthenticateHeader } from "@lib/utils";
import { CreateTeamDto, Team, UpdateTeamDto } from "@model/teams";

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
    if (!res.ok) {
      const error = await parseWWWAuthenticateHeader(res.headers.get("WWW-Authenticate"));
      console.error(JSON.stringify(error, null, 2));
      throw new Error(`Authentication error: ${res.statusText}`, {
        cause: error.error_description,
      });
    }
    return await res.json();
  }

  async createTeam(dto: CreateTeamDto): Promise<Team> {
    const url = `${environment.BACKEND_API_URL}/teams`;
    // console.debug(this.accessToken);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      const error = await parseWWWAuthenticateHeader(res.headers.get("WWW-Authenticate"));
      console.error(JSON.stringify(error, null, 2));
      throw new Error(`Authentication error: ${res.statusText}`, {
        cause: error.error_description,
      });
    }
    return await res.json();
  }

  async updateTeam(id: string, dto: UpdateTeamDto): Promise<Team> {
    const url = `${environment.BACKEND_API_URL}/teams/${id}`;
    // console.debug(this.accessToken);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    });
    if (!res.ok) {
      const error = await parseWWWAuthenticateHeader(res.headers.get("WWW-Authenticate"));
      console.error(JSON.stringify(error, null, 2));
      throw new Error(`Authentication error: ${res.statusText}`, {
        cause: error.error_description,
      });
    }
    return await res.json();
  }

  async deleteTeam(id: string): Promise<void> {
    const url = `${environment.BACKEND_API_URL}/teams/${id}`;
    // console.debug(this.accessToken);
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      const error = await parseWWWAuthenticateHeader(res.headers.get("WWW-Authenticate"));
      console.error(JSON.stringify(error, null, 2));
      throw new Error(`Authentication error: ${res.statusText}`, {
        cause: error.error_description,
      });
    }
  }

  async findPlan(id: string): Promise<void> {
    const url = `${environment.BACKEND_API_URL}/teams/${id}`;
    // console.debug(this.accessToken);
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      const error = await parseWWWAuthenticateHeader(res.headers.get("WWW-Authenticate"));
      console.error(JSON.stringify(error, null, 2));
      throw new Error(`Authentication error: ${res.statusText}`, {
        cause: error.error_description,
      });
    }
    return await res.json();
  }
}

export default TeamService;
