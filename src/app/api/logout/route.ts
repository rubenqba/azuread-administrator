import environment, { buildLogoutUrl } from "@lib/environment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return NextResponse.redirect(buildLogoutUrl(environment));
}
