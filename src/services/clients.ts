import environment from "@lib/environment";
import { parseWWWAuthenticateHeader } from "@lib/utils";
import { Client } from "@model/users";

class ClientService {
  private accessToken?: string;

  constructor(token?: string) {
    this.accessToken = token;
  }

  async getAll(): Promise<Client[]> {
    if (this.accessToken) {
      const url = `${environment.BACKEND_API_URL}/clients`;
    //   console.debug(this.accessToken);
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
    throw new Error(`Authentication error: missing token`);
  }

  findClientById(id: string): Client | undefined {
    return undefined;
  }

  updateClient(id: string, data: Client): void {}
}

export default ClientService;
