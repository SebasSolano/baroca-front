import { Form } from "ant-design-vue";
import axios from "axios";
const KEY = "8c7ef5bbb8b96738ed64e06b9b9042fd5d000be9";
const API = "https://baroca.vercel.app/api/huesped/";

export const fetchHuespedData = async (data) => {
  const url = `${API}key/id/${data}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export const fetchAddData = async (formData) => {
  const url = `${API}key/`;
  try {
    const response = await axios.post(url, formData);
    return response.data.body.data;
  } catch (error) {
    console.error("Error during post request:", error.response.data);
  }
};

export const fetchEditData = async (uuid, data) => {
  const url = `${API}key/edit/${uuid}`;
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Error during post request:", error.response.data);
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
