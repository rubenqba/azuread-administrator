import { debug } from "console";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import AzureAD, { AzureADProfile } from "next-auth/providers/azure-ad";
import { OAuthUserConfig } from "next-auth/providers/oauth";

type AzureADOptions = OAuthUserConfig<AzureADProfile> & {
  /**
   * https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples
   * @default 48
   */
  profilePhotoSize?: 48 | 64 | 96 | 120 | 240 | 360 | 432 | 504 | 648;
  /** @default "common" */
  tenantId?: string;
};

const azureOpts: AzureADOptions = {
  clientId: process.env.AZURE_CLIENT_ID!,
  clientSecret: process.env.AZURE_CLIENT_SECRET!,
  tenantId: process.env.AZURE_TENANT_ID!,
};

export const config = {
  providers: [AzureAD(azureOpts)],
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
