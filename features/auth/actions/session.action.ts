"use server";
import { Session } from "next-auth";

import { auth } from "@/utils/auth.util";

export async function getUserInfo() {
  const session = await auth();
  return session?.user as Session["user"] & { organizationNumber: string };
}
