import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());

// ✅ Check environment variables
console.log("🛠️ Checking environment variables...");
if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
  console.error(
    "❌ Missing AMADEUS_CLIENT_ID or AMADEUS_CLIENT_SECRET in .env file."
  );
  process.exit(1);
}
console.log("✅ Environment variables loaded");

app.get("/", (req, res) => {
  res.send("🌍 Amadeus Proxy Server is running");
});

app.get("/api/hotels", async (req, res) => {
  try {
    console.log("➡️ Requesting Amadeus access token...");

    const tokenRes = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const token = tokenRes.data.access_token;
    console.log("✅ Access token received");

    // ✅ Hardcoded safe hotel IDs for sandbox testing
    const hotelIds = ["HILON9D3", "RDLON311", "RDLON308"];
    console.log("✅ Using test hotel IDs:", hotelIds);

    console.log("➡️ Fetching hotel offers from Amadeus...");

    const offerRes = await axios.get(
      "https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          hotelIds: hotelIds.join(","),
          adults: 1,
          roomQuantity: 1,
          paymentPolicy: "NONE",
          bestRateOnly: true,
        },
      }
    );

    console.log("✅ Hotel offers fetched successfully");
    res.json(offerRes.data);
  } catch (error) {
    console.error("❌ Error fetching data from Amadeus:");
    if (error.response) {
      console.error("🔻 Status:", error.response.status);
      console.error(
        "🔻 Response:",
        JSON.stringify(error.response.data, null, 2)
      );
    } else {
      console.error("🔻 Error Message:", error.message);
    }
    res.status(500).json({ error: "Failed to fetch hotel data." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
