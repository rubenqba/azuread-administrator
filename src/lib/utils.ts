
// process WWW-Authenticate header response and return a dictionary
export async function parseWWWAuthenticateHeader(header?: string | null): Promise<Record<string, string>> {
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

export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    // Manejo especial para arrays y objetos anidados, si es necesario
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else if (typeof value === "object" && value !== null) {
      // Si necesitas manejar objetos anidados
      Object.keys(value).forEach((subKey) => {
        formData.append(`${key}[${subKey}]`, value[subKey]);
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}

export function wrapObjectIntoFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();
  formData.append("raw", JSON.stringify(obj));
  return formData;
}

export function unwrapObjectIntoFormData(formData: FormData): Record<string, any> | null {
  if (formData.has("raw")) {
    return JSON.parse(formData.get("raw") as string);
  }
  return null;
}
