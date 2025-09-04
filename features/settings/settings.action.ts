"use server";

import { betterFetch } from "@/utils/betterFetch.util";

import { revalidateCommonCaches } from "../auth/actions/auth.action";
import { defaultSettings } from "./settings.const";

export async function fetchSettings() {
  return defaultSettings;
}

export async function putSettings(payload: any) {
  //console.log('payload settings', payload)
  const url = `/api/settings`;
  try {
    const res = await betterFetch(url, {
      body: payload,
      method: "PATCH",
    });
    await revalidateCommonCaches();
    return res;
  } catch (error) {
    console.log("error when update settings", error);
  }
}
