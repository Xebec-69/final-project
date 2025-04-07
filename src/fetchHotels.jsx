// src/api/fetchHotels.js
import axios from "axios";
import getAmadeusAccessToken from "./src/getAmadeusAccessToken";

const fetchHotels = async () => {
  const token = await getAmadeusAccessToken();

  const response = await axios.get(
    "https://test.api.amadeus.com/v2/shopping/hotel-offers",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        cityCode: "PAR", // Paris
        checkInDate: "2025-04-10",
        checkOutDate: "2025-04-15",
        adults: 2,
        roomQuantity: 1,
      },
    }
  );

  return response.data.data;
};

export default fetchHotels;
