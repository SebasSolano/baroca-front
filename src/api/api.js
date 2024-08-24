import axios from "axios";
const KEY = "8c7ef5bbb8b96738ed64e06b9b9042fd5d000be9"
const API = "https://baroca.vercel.app/api/huesped";


export const fetchHuespedData = async (data) => {
  try {
    const response = await axios.get(API, {
      params: { key: KEY, data },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching huesped data:", error);
    throw error;
  }
};

export const fetchCountryData = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");

    return response.data;
  } catch (error) {
    console.error("Error fetching country data:", error);
  }
};
