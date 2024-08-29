import environment from "@lib/environment";
import { parseWWWAuthenticateHeader } from "@lib/utils";
import { CreatePlanDto, Plan } from "@model/plans";

class PlanService {
  private accessToken: string;

  constructor(token?: string) {
    if (!token) {
      throw new Error(`Authentication error: missing token`);
    }
    this.accessToken = token;
  }

  async getAll(): Promise<Plan[]> {
    const url = `${environment.BACKEND_API_URL}/plans`;
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

  async addPlan(dto: CreatePlanDto): Promise<Plan> {
    const url = `${environment.BACKEND_API_URL}/plans`;
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

  async updatePlan(id: string, dto: CreatePlanDto): Promise<Plan> {
    const url = `${environment.BACKEND_API_URL}/plans/${id}`;
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

  async deletePlan(id: string): Promise<void> {
    const url = `${environment.BACKEND_API_URL}/plans/${id}`;
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
    const url = `${environment.BACKEND_API_URL}/plans/${id}`;
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

export default PlanService;
