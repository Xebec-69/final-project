import axios from "axios";

// ✅ Fetch credentials from React environment variables
const clientId = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const clientSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

const getAmadeusAccessToken = async () => {
  if (!clientId || !clientSecret) {
    console.error("Amadeus credentials missing. Check your .env file.");
    return null;
  }

  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (err) {
    console.error(
      "Failed to fetch Amadeus token:",
      err.response?.data || err.message
    );
    return null;
  }
};

export default getAmadeusAccessToken;
