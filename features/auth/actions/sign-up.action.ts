"use server";
import { action } from "@/utils/safeAction.util";
import { signUpSchema, changePasswordSchema } from "../auth.schema";
import { auth } from "@/utils/auth.util";
import axios from "axios";
import qs from "querystring";

export const signUp = action(signUpSchema, async (newUser) => {
  try {
    // Check if organization number starts with 9 or 8
    if (!/^[98]\d+$/.test(newUser.company_number)) {
      return {
        code: "error",
        msg: "Organisasjonsnummeret må starte med 9 eller 8. Vennligst prøv igjen senere.",
      };
    }

    // Check if zipcode is 4 characters long
    if (newUser.zip.length !== 4) {
      return {
        code: "error",
        msg: "Postnummeret må være 4 tegn langt. Vennligst prøv igjen.",
      };
    }
    const data = qs.stringify(newUser);

    const url = process.env.NEXT_PUBLIC_API_URL + "register";
    const response = await axios({
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    });
    console.log("response-", response);
    if (response.data.status === "200") {
      const nameParts = newUser.customer_name.trim().split(" ");
      const first_name = nameParts[0];
      const last_name =
        nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""; // Handle single name case

      const contactData = {
        first_name: newUser.customer_name,
        last_name: newUser.company_name,
        email: newUser.customer_email,
      };
      const responseNew = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}subscribe/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(contactData),
        }
      );
    }
    return response.data;
  } catch (error: any) {
    console.log("response-", error);

    return error?.response?.data;
  }
});

export const changePassord = action(changePasswordSchema, async (newUser) => {
  try {
    const session = await auth();
    const user: any = session;
    const headers = user
      ? {
          Authorization: `Bearer ${user.user.accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      : {};

    const data = qs.stringify(newUser);

    const url = process.env.NEXT_PUBLIC_API_URL + "change-password";
    const response = await axios({
      method: "post",
      url: url,
      headers: headers,
      data: data,
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
});
