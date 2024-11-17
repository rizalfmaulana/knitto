import axios from "axios";

const API_KEY = "47110492-9fd8e97bcb9649c6f535f60ac";
const API_URL = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
  let url = API_URL + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;

  let paramsKey = Object.keys(params);
  paramsKey.map((key) => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });

  return url;
};
export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
