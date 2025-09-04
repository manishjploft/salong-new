import NextAuth from "next-auth";
import { authOptions } from "@/utils/auth.util";

const authHandler = NextAuth(authOptions);

export const GET = authHandler;
export const POST = authHandler;