import environment from "@lib/environment";
import { parseWWWAuthenticateHeader } from "@lib/utils";
import { CreateUserDto, UpdateUserDto, User } from "@model/users";

class UserService {
  private accessToken?: string;

  constructor(token?: string) {
    if (!token) {
      throw new Error(`Authentication error: missing token`);
    }
    this.accessToken = token;
  }

  async getAll(): Promise<User[]> {
    const url = `${environment.BACKEND_API_URL}/users`;
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

  async createUser(dto: CreateUserDto): Promise<User> {
    const url = `${environment.BACKEND_API_URL}/users`;
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

  async findUser(id: string): Promise<User> {
    const url = `${environment.BACKEND_API_URL}/users/${id}`;
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

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const url = `${environment.BACKEND_API_URL}/users/${id}`;
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

  async deleteUser(id: string): Promise<void> {
    const url = `${environment.BACKEND_API_URL}/users/${id}`;
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
}

export default UserService;
