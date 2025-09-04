"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import axios from "axios";
import { getUserInfo } from "../auth/actions/session.action";

const queryTags = {
  fetchFavorites: "fetch_favorites",
  toggleFavorite: "toggle_favorite",
  checkFavorite: "check_favorite",
};

export async function fetchFavorites() {
  const user = await getUserInfo();
  const url = `${process.env.NEXT_PUBLIC_API_URL}favorite/${user.id}/list`;
  const response = await axios.get(url);
  return response.data.data;
}

export async function toggleFavorite(productId: string) {
  try {
    const user = await getUserInfo(); // Ensure this returns `id` as expected

    const url = `${process.env.NEXT_PUBLIC_API_URL}favorite/${user.id}/add`;

    const payload = {
      productId,
    };

    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/favoritter");

    return {
      isFavorite: response.data.isFavorite,
    };
  } catch (error) {
    console.error("Server action error on favorite toggle", error);
    return { isFavorite: false };
  }
}

// export async function checkFavorite(productId: any) {
//   try {
//     const user = await getUserInfo();
//     const url = `/api/favorites/check`;
//     const cookieStore = cookies();
//     const formattedCookies = cookieStore
//       .getAll()
//       .map((cookie) => {
//         return `${cookie.name}=${cookie.value}`;
//       })
//       .join("; ");
//     const res = await betterFetch(url, {
//       headers: {
//         Cookie: formattedCookies,
//       },
//       method: "POST",
//       body: {
//         userId: user.id,
//         productId: productId,
//       },
//     });
//     return res?.isFavorite ?? false;
//   } catch (error) {
//     return {
//       isFavorite: false,
//     };
//   }
// }
