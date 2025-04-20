// src/App.jsx
import React, { useState, useEffect } from "react";
import { Search, Sliders } from "lucide-react";
import Logo from "./Logo.jsx";
import Menu from "./Menu.jsx";
import Items from "./Items.jsx";
import IconScroll from "./IconScroll.jsx";
import PopupModal from "./PopupModal.jsx";
import SummaryModal from "./SummaryModal.jsx";
import { supabase } from "./supabaseClient";

// normalize whatever comes back in .images into an array
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
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [loadingDest, setLoadingDest] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAuthMode, setMenuAuthMode] = useState(null);
  const handleLegacyClick = async () => {
    if (!user) {
      // not logged in → prompt signup/login
      // (opens your Menu in "login" mode)
      setMenuAuthMode("login");
      setIsMenuOpen(true);
      return;
    }

    // 1) Try to fetch existing prefs
    const { data: pref, error } = await supabase
      .from("travel_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error || !pref) {
      // no saved prefs → open the personalization modal
      setIsModalOpen(true);
    } else {
      // show the summary popup
      setSummaryData(pref);
      setIsSummaryOpen(true);
    }
  };
  // Restore session & fetch profile.name, then subscribe to changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfileName(u.id);
    });

    // subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfileName(u.id);
      else setProfileName(null);
    });

    // cleanup = unsubscribe
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfileName(userId) {
    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("id", userId)
      .single();
    if (!error && data?.name) {
      setProfileName(data.name);
    }
  }

  // Insert a rating row
  const handleRate = async (destination_id, ratingValue) => {
    if (!user) {
      console.warn("You must log in to rate");
      return;
    }
    const { data, error } = await supabase
      .from("ratings")
      .insert({
        user_id: user.id,
        destination_id,
        rating: ratingValue,
      })
      .select();
    if (error) console.error("Rating insert failed:", error);
    else console.log("Saved rating:", data);
  };

  // Load your destinations table
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
    // Click handler for Legacy button
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
          userName={profileName}
          setUserName={setProfileName}
        />
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center mt-4 px-2 sm:px-6">
        <div className="shadow w-full sm:w-4/5 md:w-3/4 lg:w-1/2 rounded-[121px] bg-white px-4 sm:px-8 py-4 sm:py-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <p className="font-medium text-sm sm:text-base">Where</p>
            <p className="text-xs opacity-50">Search Destination</p>
          </div>
          <div className="h-8 sm:h-12 w-px bg-gray-300" />
          <div>
            <p className="font-medium text-sm sm:text-base">Check in</p>
            <p className="text-xs opacity-50">Add dates</p>
          </div>
          <div className="h-8 sm:h-12 w-px bg-gray-300" />
          <div>
            <p className="font-medium text-sm sm:text-base">Check out</p>
            <p className="text-xs opacity-50">Add dates</p>
          </div>
          <div className="h-8 sm:h-12 w-px bg-gray-300" />
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
      <div className="  p-10 sm:p-10">
        <div className="flex flex-wrap gap-2">
          <IconScroll />
          <PopupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            setRecommendations={setRecommendations}
            user={user}
            destinationsList={destinations}
          />
          {/* **NEW**: Summary of saved prefs */}
          {isSummaryOpen && (
            <SummaryModal
              pref={summaryData}
              onClose={() => setIsSummaryOpen(false)}
              onEdit={() => {
                // close summary, open personalization
                setIsSummaryOpen(false);
                setIsModalOpen(true);
              }}
            />
          )}
          <button
            className="flex items-center w-32 sm:w-36 space-x-4 border border-customOrange text-customOrange px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100"
            onClick={handleLegacyClick}
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
      {recommendations.length > 0 && (
        <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-2 flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-2">
          <h2 className="w-full text-2xl sm:text-3xl font-bold text-orange-500 mb-4">
            Recommended For You
          </h2>

          {recommendations.map((rec) => (
            <Items
              key={`rec-${rec.id}`}
              id={rec.id}
              images={parseImages(rec.images)}
              title={rec.name}
              rating={rec.rating}
              price={rec.budget_range}
              description={rec.description}
              isLoggedIn={!!user}
              canRate={true}
              onRate={handleRate}
            />
          ))}
        </div>
      )}

      {/* Main Listings */}
      <div className="px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-2 flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 md:gap-2">
        {loadingDest ? (
          <p>Loading destinations…</p>
        ) : destinations.length === 0 ? (
          <p>No destinations found.</p>
        ) : (
          destinations.map((dest) => (
            <Items
              key={`dest-${dest.id}`}
              id={dest.id}
              images={parseImages(dest.images)}
              title={dest.name}
              location={dest.best_season}
              rating={dest.rating}
              price={dest.budget_range}
              description={dest.description}
              isLoggedIn={!!user}
              canRate={false}
            />
          ))
        )}
      </div>
    </>
  );
}
