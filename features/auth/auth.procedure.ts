import { User } from "next-auth";
import { redirect } from "next/navigation";
import { SetRequired } from "type-fest";
import { createServerActionProcedure } from "zsa";

import { auth } from "@/utils/auth.util";

type UserToken = SetRequired<User, keyof User> & {
  organizationNumber: string;
  duellToken: string;
};

export const protectedProcedure = createServerActionProcedure().handler(
  async () => {
    const session = await auth();
    const user = session?.user as UserToken;
    if (!session || (session && !user?.id)) {
      redirect("/logg-inn");
    }

    return user;
  }
);

export const withUserProcedure = createServerActionProcedure().handler(
  async () => {
    const session = await auth();
    const user = session?.user as UserToken;
    return user;
  }
);
