import { debug } from "console";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import AzureADB2C, { AzureB2CProfile } from "next-auth/providers/azure-ad-b2c";
import { OAuthUserConfig } from "next-auth/providers/oauth";

type AzureADOptions = OAuthUserConfig<AzureB2CProfile> & {
  primaryUserFlow?: string;
  tenantId?: string;
};

const azureOpts: AzureADOptions = {
  name: "DARDEUS Administrator",
  tenantId: process.env.AZURE_TENANT_NAME!,
  clientId: process.env.AZURE_CLIENT_ID!,
  clientSecret: process.env.AZURE_CLIENT_SECRET!,
  primaryUserFlow: process.env.AZURE_USER_FLOW_NAME!,
  authorization: {
    params: {
      scope: `openid https://${process.env.AZURE_TENANT_NAME}.onmicrosoft.com/${process.env.AZURE_AUDIENCE}/Admin`,
    },
  },
};

export const config = {
  providers: [AzureADB2C(azureOpts)],
  theme: {
    logo: "https://ddassets.dardeus.io/logos/dardeus/logo-dardeus-black.jpg",
    brandColor: "#14213D",
    colorScheme: "auto",
  },
  debug: true,
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}
