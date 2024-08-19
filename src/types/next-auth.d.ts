import NextAuth from "next-auth";

type PartnerInfo = {
  id: string | null;
  name: string | null;
  subscription: string | null;
  roles: string[];
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: User;
    accessToken?: string;
  }

  interface User {
    id: string;
    displayName: string;
    givenName: string;
    familyName: string;
    country: string;
    partner: PartnerInfo;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: User;
    accessToken?: string;
  }
}

declare module "next-auth/providers/azure-ad-b2c" {
  interface AzureB2CProfile {
    given_name: string;
    family_name: string;
    country: string;
    extension_PartnerID?: string;
    extension_PartnerName?: string;
    extension_SubscriptionType?: string;
    extension_PartnerRole?: string;
  }
}
