"use server";

import axios from "axios";

export async function fetchSetting() {
  try {
    // Sending GET request using axios to fetch setting
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + `setting`);
      
    // Assuming the response data contains the list of setting
    return res.data.data; // Return the data as it is from the API response
  } catch (error) {
    console.error("Error fetching setting:", error);
    return []; // Return an empty array in case of an error
  }
}
