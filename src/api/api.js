import axios from "axios";
const API = "https://baroca.vercel.app/api/huesped";

export const fetchHuespedData = async (data) => {
  try {
    const response = await axios.get(API, {
      params: { data },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching huesped data:", error);
    throw error;
  }
};
