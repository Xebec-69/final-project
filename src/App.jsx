import React, { useState, useEffect } from "react";
import { Search, Sliders, Heart } from "lucide-react";
import Logo from "./Logo.jsx";
import Menu from "./Menu.jsx";
import Items from "./Items.jsx";
import IconScroll from "./IconScroll.jsx";
import PopupModal from "./PopupModal.jsx";
// in App.jsx (and anywhere else)
import { supabase } from "./supabaseClient";

// Try to turn dest.images into an array of URLs.
//  • If it's already an array, return as‑is.
//  • If JSON.parse works, return that.
//  • Otherwise split on commas or wrap the single URL in an array.
/**
 * Turn whatever you stored in dest.images into an array of clean URLs:
 *  • If it’s already an Array → return as‑is
 *  • If it’s a JSON‑style array string (with single quotes) → normalize & JSON.parse
 *  • Otherwise strip any leading/trailing quotes and wrap in an array
 */

function parseImages(images) {
  if (!images) return [];
  if (Array.isArray(images)) return images;

  const str = images.trim();
  // normalize single‑quoted arrays to valid JSON
  if (str.startsWith("[") && str.endsWith("]")) {
    try {
      const fixed = str.replace(/'/g, '"');
      const parsed = JSON.parse(fixed);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      console.warn("Could not JSON.parse images:", e);
    }
  }

  // fallback: strip any wrapping quotes
  const url = str.replace(/^['"]+|['"]+$/g, "");
  return [url];
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loadingDest, setLoadingDest] = useState(true);

  // controls the little dropdown in the header
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // tells the menu whether to show signup or login
  const [menuAuthMode, setMenuAuthMode] = useState(null); // "login" | "signup" | null

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    // 1) Get the initial user
    supabase.auth.getUser().then(({ data }) => {
      setUserName(data.user ?? null);
    });

    // 2) Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUserName(session?.user ?? null);
    });

    // 3) Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const handleRate = async (destination_id, ratingValue) => {
    if (!userName) {
      // you could also show a toast: “please log in to rate”
      console.warn("Cannot rate—no user signed in");
      return;
    }
    const { data, error } = await supabase
      .from("ratings")
      .insert({
        user_id: userName.id,
        destination_id,
        rating: ratingValue,
      })
      .select();
    if (error) console.error("Rating insert failed:", error);
    else console.log("Saved rating:", data);
  };
  useEffect(() => {
    async function loadDestinations() {
      setLoadingDest(true);
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("id", { ascending: true });

      if (error) console.error("Supabase error:", error);
      else setDestinations(data);

      setLoadingDest(false);
    }
    loadDestinations();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between w-full px-4 sm:px-8 py-4 relative">
        <Logo />
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <span className="font-bold text-black text-base sm:text-lg">
            Home
          </span>
          <span className="mx-2 text-gray-400">|</span>
          <button className="text-customOrange font-semibold text-sm sm:text-base">
            Be come partnar
          </button>
        </div>

        <Menu
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
          authMode={menuAuthMode}
          setAuthMode={setMenuAuthMode}
          userName={userName}
          setUserName={setUserName}
        />
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center mt-4 px-2 sm:px-6">
        <div className="shadow w-full sm:w-4/5 md:w-3/4 lg:w-1/2 rounded-[121px] bg-white px-4 sm:px-8 py-4 sm:py-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <p className="font-medium text-sm sm:text-base">Where</p>
            <p className="text-xs opacity-50">Search Destination</p>
          </div>
          <div className="h-8 sm:h-12 w-px bg-gray-300"></div>
          <div>
            <p className="font-medium text-sm sm:text-base">Check in</p>
            <p className="text-xs opacity-50">Add dates</p>
          </div>
          <div className="h-8 sm:h-12 w-px bg-gray-300"></div>
          <div>
            <p className="font-medium text-sm sm:text-base">Check out</p>
            <p className="text-xs opacity-50">Add dates</p>
          </div>
          <div className="h-8 sm:h-12 w-px bg-gray-300"></div>
          <div>
            <p className="font-medium text-sm sm:text-base">Who</p>
            <p className="text-xs opacity-50">Add guests</p>
          </div>
          <div className="bg-customOrange p-3 rounded-full">
            <Search width={20} height={20} className="text-white" />
          </div>
        </div>
      </div>

      {/* Listings Header */}
      <div className="p-4 sm:p-10">
        <div className="flex flex-wrap gap-2">
          <IconScroll />
          <PopupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            setRecommendations={setRecommendations}
          />
          <button
            className="flex items-center w-32 sm:w-36 space-x-4 border border-customOrange text-customOrange px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100"
            onClick={() => {
              if (!userName) {
                // not signed in → open menu in "login" mode
                setMenuAuthMode("login");
                setIsMenuOpen(true);
              } else {
                // already signed in → open your travel modal
                setIsModalOpen(true);
              }
            }}
          >
            <img
              src="/images/Vector.svg"
              alt="Logo"
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition rounded-lg"
            />
            <span className="font-medium text-customOrange">Legacy</span>
          </button>
          <button className="flex items-center w-32 sm:w-36 space-x-4 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <Sliders className="h-5 w-5" />
            <span className="font-medium">Filters</span>
          </button>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-2 flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-4">
            Recommended For You
          </h2>
          <div className="flex flex-wrap gap-8 p-2 justify-start">
            {recommendations.map((rec) => (
              <Items
                key={`rec-${rec.id}`}
                id={rec.id}
                images={parseImages(rec.images)} // use the array from your API
                title={rec.name} // your API’s `name`
                // new prop for tags
                rating={rec.rating} // number
                price={rec.budget_range} // your API’s budget_range
                description={rec.description} // description
                onToggleFavorite={() => toggleFavorite(rec.id)}
                isLoggedIn={!!userName}
                onRate={handleRate}
                canRate={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Listings */}

      <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-2 flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-8">
        {loadingDest ? (
          <p>Loading destinations…</p>
        ) : destinations.length === 0 ? (
          <p>No destinations found.</p>
        ) : (
          destinations.map((dest) => (
            <Items
              key={dest.id}
              id={dest.id}
              images={parseImages(dest.images)}
              title={dest.name}
              location={dest.best_season}
              rating={dest.rating}
              price={dest.budget_range}
              description={dest.description}
              isFavorite={favorites.includes(dest.id)}
              onToggleFavorite={() => toggleFavorite(dest.id)}
              canRate={false}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
