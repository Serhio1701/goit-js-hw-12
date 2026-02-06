import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "54018968-920e73cf119f2d437152d8f97";

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page,
      per_page: 40,
    },
  });

  return response.data;
}

  