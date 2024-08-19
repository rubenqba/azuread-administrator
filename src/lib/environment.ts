import { z } from "zod";

const schema = z.object({
  AZURE_AD_B2C_TENANT_NAME: z.string(),
  AZURE_AD_B2C_CLIENT_ID: z.string(),
  AZURE_AD_B2C_CLIENT_SECRET: z.string(),
  AZURE_AD_B2C_PRIMARY_USER_FLOW: z.string(),
  AZURE_AD_B2C_AUDIENCE: z.string().optional(),
  BACKEND_API_URL: z.string().url()
});

export type Config = z.infer<typeof schema>;

export default schema.parse(process.env);

export function buildLogoutUrl(config: Config) {
  const url = `https://${config.AZURE_AD_B2C_TENANT_NAME}.b2clogin.com/${config.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/${config.AZURE_AD_B2C_PRIMARY_USER_FLOW}/oauth2/v2.0/logout?p=${process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW}&post_logout_redirect_uri=${process.env.NEXTAUTH_URL}`;
  console.log("Logout URL:", url);
  return url;
}
