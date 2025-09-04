"use server";

import { betterFetch } from "@/utils/betterFetch.util";

const queryTags = {
  fetchBrands: "fetch_brand",
};

// TODO: migrate this using zsa procedure
export async function fetchBrands() {
  try {
    const res = await betterFetch(
      `${process.env.NEXT_PUBLIC_API_URL}brands`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/x-www-form-urlencoded",
        },
        next: {
          tags: [queryTags.fetchBrands],
        },
      },
      true
    );

    return res.data;
  } catch (error) {
    return [];
  }
}

export async function fetchBrandIcons() {
  try {
    const res = await betterFetch(
      `${process.env.NEXT_PUBLIC_API_URL}brand-icons`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/x-www-form-urlencoded",
        },
        next: {
          tags: [queryTags.fetchBrands],
        },
      },
      true
    );

    return res.data;
  } catch (error) {
    console.log("error", error);

    return [];
  }
}
