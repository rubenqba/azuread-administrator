import environment from "@lib/environment";
import { parseWWWAuthenticateHeader } from "@lib/utils";
import { Client } from "@model/users";

class ClientService {
  private accessToken?: string;

  constructor(token?: string) {
    if (!token) {
      throw new Error(`Authentication error: missing token`);
    }
    this.accessToken = token;
  }

  async getAll(): Promise<Client[]> {
    const url = `${environment.BACKEND_API_URL}/clients`;
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

  async findClientById(id: string): Promise<Client> {
    const url = `${environment.BACKEND_API_URL}/clients/${id}`;
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

  updateClient(id: string, data: Client): void {}
}

export default ClientService;
