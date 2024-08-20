// process WWW-Authenticate header response and return a dictionary
export async function parseWWWAuthenticateHeader(
    header?: string | null
  ): Promise<Record<string, string>> {
    if (header) {
      const result: Record<string, string> = {};
      const parts = header.substring(7).split(", ");
      for (const part of parts) {
        const [key, value] = part.split("=");
        result[key] = value.replaceAll('"', "");
      }
      return Promise.resolve(result);
    }
    return Promise.resolve({});
  }
