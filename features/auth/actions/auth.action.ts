"use server";
import { revalidatePath } from "next/cache";

export const revalidateCommonCaches = async () => {
  revalidatePath("/", "layout");
};
