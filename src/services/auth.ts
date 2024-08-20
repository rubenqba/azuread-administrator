
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import AzureADB2C, { AzureB2CProfile } from "next-auth/providers/azure-ad-b2c";
import { OAuthUserConfig } from "next-auth/providers/oauth";
import { PartnerInfo } from "../types/next-auth";
import environment, { Config } from "@lib/environment";
import { refreshAccessToken } from "@lib/auth";

function buildAzureADB2CConfig(config: Config) {
  const opts: OAuthUserConfig<AzureB2CProfile> & {
    primaryUserFlow?: string;
    tenantId?: string;
  } = {
    name: "DARDEUS Administrator",
    tenantId: config.AZURE_AD_B2C_TENANT_NAME,
    clientId: config.AZURE_AD_B2C_CLIENT_ID,
    clientSecret: config.AZURE_AD_B2C_CLIENT_SECRET,
    primaryUserFlow: config.AZURE_AD_B2C_PRIMARY_USER_FLOW,
    profile: (profile, tokens) => {
      console.log("THE PROFILE", profile);

      const partner: PartnerInfo = {
        id: profile.extension_PartnerID ?? null,
        name: profile.extension_PartnerName ?? null,
        subscription: profile.extension_SubscriptionType ?? null,
        roles: profile.extension_PartnerRole?.split(",") ?? [],
      };

      return {
        id: profile.oid ?? profile.sub,
        displayName:
          profile.name ??
          [profile.given_name, profile.family_name]
            .filter((t) => t && t.length > 0)
            .join(" "),
        givenName: profile.given_name,
        familyName: profile.family_name,
        country: profile.country,
        email: profile.emails?.length > 0 ? profile.emails[0] : null,
        partner,
      };
    },
    authorization: {
      params: {
        scope: `${config.AZURE_AD_B2C_AUDIENCE}/Admin openid offline_access`,
      },
    }
  };
  return opts;
}
const azureOpts = buildAzureADB2CConfig(environment);

export const config: NextAuthOptions = {
  providers: [AzureADB2C(azureOpts)],
  theme: {
    logo: "https://ddassets.dardeus.io/logos/dardeus/logo-dardeus-black.jpg",
    brandColor: "#14213D",
    colorScheme: "auto",
  },
  callbacks: {
    async jwt({ token, user, account, profile, session, trigger }) {
      if (account) {
        token.accessToken = account.access_token;
        // token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.expires = (account?.expires_at ?? 0) * 1000;
      }
      if (profile) {
        token.user = user;
      }

      if (token.expires > 0 && Date.now() < token.expires) {
        return token;
      }

      return refreshAccessToken(token, environment);
    },
    async session({ session, token, user }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      // if (token.idToken) {
      //   session.idToken = token.idToken;
      // }
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  debug: true,
};

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, config);
}
