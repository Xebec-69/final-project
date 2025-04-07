import React, { useState, useEffect } from "react";
import { Search, Sliders } from "lucide-react";
import Logo from "./Logo.jsx";
import Menu from "./Menu.jsx";
import Items from "./Items.jsx";
import IconScroll from "./IconScroll.jsx";
import PopupModal from "./PopupModal.jsx";
import axios from "axios";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  const fetchUnsplashImage = async (hotelName) => {
    try {
      const res = await axios.get("https://api.unsplash.com/search/photos", {
        params: {
          query: `hotel ${hotelName}`,
          client_id: "Qlu_q3rKwupC1hYsxkfFA5BIJuoJjbfZ0wdXitLoffk",
          orientation: "landscape",
          per_page: 1,
        },
      });

      return (
        res.data.results[0]?.urls?.small ||
        "https://source.unsplash.com/featured/?hotel"
      );
    } catch (error) {
      console.error("Unsplash image fetch error:", error);
      return "https://source.unsplash.com/featured/?hotel";
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);

      try {
        const geoRes = await axios.get("https://api.geoapify.com/v2/places", {
          params: {
            categories: "accommodation.hotel",
            filter: "circle:16.3738,48.2082,5000",
            limit: 5,
            apiKey: "779636eb19fb429fb577544f0a40d322",
          },
        });

        const places = geoRes.data.features;

        const hotelData = await Promise.all(
          places.map(async (place, index) => {
            const hotelName = place.properties.name || "hotel";
            const imageUrl = await fetchUnsplashImage(hotelName);

            return {
              id: index,
              images: [imageUrl],
              title: hotelName,
              location: place.properties.address_line1 || "Unknown Location",
              rating: (Math.random() * 2 + 3).toFixed(1),
              price: (Math.random() * 200 + 50).toFixed(0),
              description:
                place.properties.categories?.[0] || "Hotel accommodation",
            };
          })
        );

        setListings(hotelData);
      } catch (error) {
        console.error("Failed to fetch listings from Geoapify:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between w-full px-8 py-4 relative">
        <Logo />
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <span className="font-bold text-black">Home</span>
          <span className="mx-2 text-gray-400">|</span>
          <button
            className="text-customOrange font-semibold"
            onClick={() => setIsModalOpen(true)}
          >
            Let's personalize your trips!
          </button>
        </div>
        <Menu />
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center mt-4">
        <div className="shadow w-1/2 rounded-full bg-white px-8 py-6 flex justify-between items-center">
          <div>
            <p>Where</p>
            <p className="text-sm opacity-50">Search Destination</p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>Check in</p>
            <p className="text-sm opacity-50">Add dates</p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>Check out</p>
            <p className="text-sm opacity-50">Add dates</p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>Who</p>
            <p className="text-sm opacity-50">Add guests</p>
          </div>
          <div className="bg-customOrange p-4 rounded-full">
            <Search width={30} height={30} className="text-white" />
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="p-10">
        <div className="flex space-x-2">
          <IconScroll />
          <PopupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            setRecommendations={setRecommendations}
          />
          <button
            className="flex items-center w-36 space-x-4 border border-customOrange text-customOrange px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src="/images/Vector.svg"
              alt="Logo"
              className="w-10 h-10 cursor-pointer hover:opacity-80 transition rounded-lg"
            />
            <span className="font-medium test-customOrange">Legacy</span>
          </button>
          <button className="flex items-center w-36 space-x-4 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <Sliders className="h-5 w-5" />
            <span className="font-medium">Filters</span>
          </button>
        </div>
      </div>
      {recommendations && recommendations.length > 0 && (
        <div className="sm:ml-[130px] sm:mr-[80px] mt-12">
          <h2 className="text-3xl font-bold text-orange-500 mb-4">
            Recommended For You
          </h2>
          <div className="flex flex-wrap gap-8 p-2 justify-start">
            {recommendations.map((rec, index) => (
              <Items
                key={`rec-${index}`}
                id={`rec-${index}`}
                images={[
                  rec.imageUrl ||
                    "https://source.unsplash.com/featured/?travel,recommendation",
                ]}
                title={rec.title || rec.name || `Recommendation ${index + 1}`}
                location={rec.location || "Based on your preferences"}
                rating={(Math.random() * 2 + 3).toFixed(1)}
                price={(Math.random() * 150 + 50).toFixed(0)}
                description={rec.description || "Personalized recommendation"}
              />
            ))}
          </div>
        </div>
      )}
      <div className="sm:ml-[130px] sm:mr-[80px] flex flex-wrap gap-8 p-2 justify-start">
        {isLoading ? (
          <p>Loading listings...</p>
        ) : listings.length === 0 ? (
          <p>No hotels found in this area.</p>
        ) : (
          listings.map((listing) => (
            <Items
              key={listing.id}
              id={listing.id}
              images={listing.images}
              title={listing.title}
              location={listing.location}
              rating={listing.rating}
              price={listing.price}
              description={listing.description}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
