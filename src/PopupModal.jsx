import React, { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "./supabaseClient";
const travelStyleOptions = [
  "Adventure",
  "Beach/Relaxation",
  "Food & Culinary",
  "Nature & Hiking",
  "Theme Parks",
  "Cruise",
  "Festivals & Events",
  "Shopping",
  "Cultural & Historical",
];
const tripDurationMap = {
  short: "Short (1-3 days)",
  medium: "Medium (4-7 days)",
  long: "Long (8+ days)",
};
const budgetMap = {
  low: "Low ($100-$500)",
  medium: "Medium ($500-$2000)",
  high: "High ($2000+)",
};
const climateOptions = ["Warm", "Cold", "Mild", "No Preference"];
const companionOptions = ["Solo", "Family", "Friends", "Partner", "Group Tour"];
const transportOptions = ["Flight", "Train", "Road Trip", "Cruise"];
const accommodationOptions = ["Hotel", "Villa", "Camping", "Hostel", "Resort"];
const interestOptions = [
  "Arts & Museums",
  "Music & Nightlife",
  "Fitness & Wellness",
  "Literature & Bookstores",
  "Wildlife & Safari",
  "Sports & Outdoor Activities",
];

// helper to title‑case arbitrary strings
function titleCase(str = "") {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
const TravelModal = ({
  isOpen,
  onClose,
  setRecommendations,
  user,
  destinationsList,
}) => {
  const [step, setStep] = useState(1);
  const [selectedPreferences, setSelectedPreferences] = useState({
    travelStyle: null,
    tripDuration: null,
    budget: null,
    climate: null,
  });
  // at the top of TravelModal component:
  const [pastSuggestions, setPastSuggestions] = useState([]);
  const allNames = destinationsList.map((d) => d.name); // array of strings

  const [leastSuggestions, setLeastSuggestions] = useState([]);
  const [favSuggestions, setFavSuggestions] = useState([]);
  const [selectedCompanions, setSelectedCompanions] = useState([]);
  const [destinations, setDestinations] = useState({
    past: [],
    favorite: [],
    leastFavorite: [],
  });
  const [searchInputs, setSearchInputs] = useState({
    past: "",
    favorite: "",
    leastFavorite: "",
  });
  useEffect(() => {
    if (!isOpen || !user) return;

    (async () => {
      const { data: pref, error } = await supabase
        .from("travel_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error || !pref) {
        console.log("No saved preferences for this user.");
        return;
      }

      // 1) Preferences step
      setSelectedPreferences({
        travelStyle:
          travelStyleOptions.find(
            (o) => o.toLowerCase() === pref.favorite_travel_style
          ) || null,
        tripDuration: tripDurationMap[pref.trip_duration] || null,
        budget: budgetMap[pref.budget_range] || null,
        climate:
          climateOptions.find((o) => o.toLowerCase() === pref.climate) || null,
      });

      // 2) Companions
      setSelectedCompanions(
        (pref.travel_companions || "")
          .split(",")
          .map((low) =>
            companionOptions.find((o) => o.toLowerCase() === low.trim())
          )
          .filter(Boolean)
      );

      // 3) Destinations
      setDestinations({
        past: (pref.past_destinations_visited || "")
          .split(",")
          .map(titleCase)
          .filter(Boolean),
        favorite: (pref.favorite_past_trip || "")
          .split(",")
          .map(titleCase)
          .filter(Boolean),
        leastFavorite: (pref.least_favorite_trip || "")
          .split(",")
          .map(titleCase)
          .filter(Boolean),
      });

      // 4) Transport / Accommodation / Interests
      setSelectedTransport(
        transportOptions.find(
          (o) => o.toLowerCase() === pref.preferred_transport
        ) || null
      );
      setSelectedAccommodation(
        accommodationOptions.find(
          (opt) => opt.toLowerCase() === pref.preferred_accommodation_type
        ) || null
      );
      setSelectedInterest(
        interestOptions.find(
          (o) =>
            o.toLowerCase() ===
            (pref.top_interests_activities || "").split(",")[0]
        ) || null
      );
    })();
  }, [isOpen, user]);

  // ───── helpers ────────────────────────────────────────────────────

  const toggleCompanion = (companion) => {
    setSelectedCompanions((prev) =>
      prev.includes(companion)
        ? prev.filter((item) => item !== companion)
        : [...prev, companion]
    );
  };

  const handleAddDestination = (section) => {
    if (searchInputs[section].trim()) {
      setDestinations((prev) => ({
        ...prev,
        [section]: [...prev[section], searchInputs[section].trim()],
      }));
      setSearchInputs((prev) => ({ ...prev, [section]: "" }));
    }
  };

  const handleRemoveDestination = (section, index) => {
    setDestinations((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleKeyPress = (e, section) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddDestination(section);
    }
  };

  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);

  const handleSelectTransport = (item) => setSelectedTransport(item);
  const handleSelectAccommodation = (item) => setSelectedAccommodation(item);
  const handleSelectInterest = (item) => setSelectedInterest(item);

  const sendToRecommendationAPI = async (data) => {
    try {
      const response = await axios.post(
        "https://go-genius-api-production.up.railway.app/recommend",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("Recommendation API error:", error);
      return null;
    }
  };

  const handleFinalSubmit = async () => {
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      console.error("No logged‑in user—cannot save preferences", userErr);
      return;
    }

    const payload = {
      user_id: "user123",
      travel_style: selectedPreferences.travelStyle
        ? [selectedPreferences.travelStyle.toLowerCase()]
        : [],
      duration: selectedPreferences.tripDuration
        ?.toLowerCase()
        .includes("short")
        ? "short"
        : selectedPreferences.tripDuration?.toLowerCase().includes("medium")
        ? "medium"
        : "long",
      budget: selectedPreferences.budget?.toLowerCase().includes("low")
        ? "low"
        : selectedPreferences.budget?.toLowerCase().includes("medium")
        ? "medium"
        : "high",
      climate: selectedPreferences.climate?.toLowerCase(),
      companions: selectedCompanions.map((c) => c.toLowerCase()),
      past_destinations: destinations.past.map((d) => d.toLowerCase()),
      favorite_trip: destinations.favorite.map((d) => d.toLowerCase()),
      least_favorite_trip: destinations.leastFavorite.map((d) =>
        d.toLowerCase()
      ),
      transport: selectedTransport ? [selectedTransport.toLowerCase()] : [],
      accommodation: selectedAccommodation
        ? [selectedAccommodation.toLowerCase()]
        : [],
      interests: selectedInterest ? [selectedInterest.toLowerCase()] : [],
      test_mode: false,
    };
    const prefRecord = {
      user_id: user.id,
      favorite_travel_style: payload.travel_style[0] || null,
      trip_duration: payload.duration,
      budget_range: payload.budget,
      climate: payload.climate,
      travel_companions: payload.companions.join(","),
      past_destinations_visited: payload.past_destinations.join(","),
      favorite_past_trip: payload.favorite_trip.join(","),
      least_favorite_trip: payload.least_favorite_trip.join(","),
      preferred_transport: payload.transport[0] || null,
      preferred_accommodation_type: payload.accommodation[0] || null, // ← exact column name
      top_interests_activities: payload.interests.join(","),
    };
    const { data: existing, error: selectErr } = await supabase
      .from("travel_preferences")
      .select("user_id")
      .eq("user_id", user.id)
      .single();

    if (selectErr && selectErr.code !== "PGRST116") {
      // PGRST116 is “no rows found” when using .single()
      console.error("Error checking for existing prefs:", selectErr);
    }

    if (existing) {
      // user already has a row → update it
      const { data: updated, error: updateErr } = await supabase
        .from("travel_preferences")
        .update(prefRecord)
        .eq("user_id", user.id);
      if (updateErr) {
        console.error("Failed to update preferences:", updateErr);
      } else {
        console.log("Preferences updated:", updated);
      }
    } else {
      // no existing row → insert new
      const { data: inserted, error: insertErr } = await supabase
        .from("travel_preferences")
        .insert(prefRecord);
      if (insertErr) {
        console.error("Failed to insert preferences:", insertErr);
      } else {
        console.log("Preferences inserted:", inserted);
      }
    }
    const result = await sendToRecommendationAPI(payload);
    if (result) {
      setRecommendations(result);
    }
    setStep(5);
  };

  if (!isOpen) return null;

  const handleSelection = (category, value) => {
    setSelectedPreferences((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-12 rounded-2xl shadow-lg max-w-4xl w-full text-center relative overflow-hidden">
        {/* Butterfly Image */}

        {/* Close Button */}
        <button
          className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-3xl"
          onClick={() => {
            setStep(1);
            onClose();
          }}
        >
          &times;
        </button>

        {/* Step 1: Welcome Screen */}
        {step === 1 && (
          <>
            <h2 className="text-4xl font-bold text-orange-500">
              Welcome to <span className="text-black">GoGenius!</span>
            </h2>
            <p className="text-gray-700 mt-4 text-lg">
              Let’s personalize your travel experience.
            </p>
            <p className="text-gray-600 text-base mt-3">
              Tell us about your travel style, preferences, and interests, and
              we'll recommend the best destinations, stays, and activities just
              for you!
            </p>
            <ul className="mt-6 text-lg text-gray-600 space-y-2">
              <li>✅ Takes less than 2 minutes</li>
              <li>✅ Get personalized travel suggestions</li>
              <li>✅ Discover trips that match your style</li>
            </ul>
            <button
              className="px-6 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition"
              onClick={() => setStep(2)}
            >
              Let’s Get Started
            </button>
          </>
        )}

        {/* Step 2: Preferences */}
        {step === 2 && (
          <>
            <h2 className="text-3xl font-bold text-orange-500 text-left">
              Preferences
            </h2>
            <div className="mt-6 text-left">
              <p className="font-semibold text-gray-700">
                Favorite Travel Style
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Adventure",
                  "Beach/Relaxation",
                  "Food & Culinary",
                  "Nature & Hiking",
                  "Theme Parks",
                  "Cruise",
                  "Festivals & Events",
                  "Shopping",
                  "Cultural & Historical",
                ].map((item) => (
                  <button
                    key={item}
                    className={`border px-4 py-2 rounded-lg ${
                      selectedPreferences.travelStyle === item
                        ? "bg-orange-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleSelection("travelStyle", item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 text-left">
              <p className="font-semibold text-gray-700">Trip Duration</p>
              <div className="flex gap-2 mt-2">
                {[
                  "Short (1-3 days)",
                  "Medium (4-7 days)",
                  "Long (8+ days)",
                ].map((item) => (
                  <button
                    key={item}
                    className={`border px-4 py-2 rounded-lg ${
                      selectedPreferences.tripDuration === item
                        ? "bg-orange-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleSelection("tripDuration", item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 text-left">
              <p className="font-semibold text-gray-700">
                Budget Range ($ per trip)
              </p>
              <div className="flex gap-2 mt-2">
                {[
                  "Low ($100-$500)",
                  "Medium ($500-$2000)",
                  "High ($2000+)",
                ].map((item) => (
                  <button
                    key={item}
                    className={`border px-4 py-2 rounded-lg ${
                      selectedPreferences.budget === item
                        ? "bg-orange-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleSelection("budget", item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 text-left">
              <p className="font-semibold text-gray-700">Climate</p>
              <div className="flex gap-2 mt-2">
                {["Warm", "Cold", "Mild", "No Preference"].map((item) => (
                  <button
                    key={item}
                    className={`border px-4 py-2 rounded-lg ${
                      selectedPreferences.climate === item
                        ? "bg-orange-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleSelection("climate", item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="px-6 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition"
                onClick={() => setStep(3)}
              >
                Continue
              </button>
            </div>
          </>
        )}
        {/* Step 3: Travel History & Experience */}
        {step === 3 && (
          <>
            {" "}
            <div className="p-6">
              <h2 className="text-3xl font-semibold text-orange-500 mb-6 text-left">
                Travel History & Experience
              </h2>

              <div className="flex justify-between gap-6">
                {/* Travel Companions */}
                <div className="mb-6 text-left w-1/2">
                  <h3 className="text-lg font-medium mb-2">
                    Travel Companions
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {["Solo", "Family", "Friends", "Partner", "Group Tour"].map(
                      (companion) => (
                        <button
                          key={companion}
                          onClick={() => toggleCompanion(companion)}
                          className={`border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-100 ${
                            selectedCompanions.includes(companion)
                              ? "bg-orange-500 text-white"
                              : "bg-white"
                          }`}
                        >
                          {companion}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Least Favorite Trip */}
                <div className="mb-6 mr-4 pr-20 text-left relative">
                  <h3 className="text-lg font-medium mb-2">
                    Least Favorite Trip
                  </h3>
                  <input
                    type="text"
                    placeholder="Pick from past destinations"
                    className="w-full border border-gray-300 rounded-lg px-2 py-2"
                    value={searchInputs.leastFavorite}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchInputs((prev) => ({
                        ...prev,
                        leastFavorite: val,
                      }));
                      setLeastSuggestions(
                        destinations.past.filter((name) =>
                          name.toLowerCase().includes(val.toLowerCase())
                        )
                      );
                    }}
                    onFocus={() => {
                      setLeastSuggestions(destinations.past);
                    }}
                    onBlur={() => {
                      setTimeout(() => setLeastSuggestions([]), 100);
                    }}
                    onKeyPress={(e) => handleKeyPress(e, "leastFavorite")}
                  />

                  {leastSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-auto">
                      {leastSuggestions.map((name) => (
                        <li
                          key={name}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setDestinations((prev) => ({
                              ...prev,
                              leastFavorite: [...prev.leastFavorite, name],
                            }));
                            setSearchInputs((prev) => ({
                              ...prev,
                              leastFavorite: "",
                            }));
                            setLeastSuggestions([]);
                          }}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    {destinations.leastFavorite.map((destination, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-100 rounded-lg px-4 py-1"
                      >
                        <span className="text-sm">{destination}</span>
                        <button
                          onClick={() =>
                            handleRemoveDestination("leastFavorite", index)
                          }
                          className="ml-2 text-gray-500 hover:text-gray-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Past Destinations Visited */}
              <div className="mb-6 text-left relative">
                <h3 className="text-lg font-medium mb-2">
                  Past Destinations Visited
                </h3>

                <input
                  type="text"
                  placeholder="Search Destination"
                  className="w-1/2 border border-gray-300 rounded-lg px-4 py-2"
                  value={searchInputs.past}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchInputs((prev) => ({ ...prev, past: val }));
                    // filter suggestions as you type
                    setPastSuggestions(
                      allNames.filter((name) =>
                        name.toLowerCase().includes(val.toLowerCase())
                      )
                    );
                  }}
                  onFocus={() => {
                    // when they focus, show all suggestions
                    setPastSuggestions(allNames);
                  }}
                  onBlur={() => {
                    // delay hiding so click can register
                    setTimeout(() => setPastSuggestions([]), 100);
                  }}
                  onKeyPress={(e) => handleKeyPress(e, "past")}
                />

                {/* suggestion dropdown */}
                {pastSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-1/2 bg-white border border-gray-200 rounded-md mt-1 max-h-48 overflow-auto">
                    {pastSuggestions.map((name) => (
                      <li
                        key={name}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          // add it to your list & clear the input + suggestions
                          setDestinations((prev) => ({
                            ...prev,
                            past: [...prev.past, name],
                          }));
                          setSearchInputs((prev) => ({ ...prev, past: "" }));
                          setPastSuggestions([]);
                        }}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}

                {/* show chips for already‑added */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {destinations.past.map((destination, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 rounded-lg px-4 py-1"
                    >
                      <span className="text-sm">{destination}</span>
                      <button
                        onClick={() => handleRemoveDestination("past", index)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorite Past Trip */}
              <div className="mb-6 text-left relative">
                <h3 className="text-lg font-medium mb-2">Favorite Past Trip</h3>
                <input
                  type="text"
                  placeholder="Pick from past destinations"
                  className="w-1/2 border border-gray-300 rounded-lg px-4 py-2"
                  value={searchInputs.favorite}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchInputs((prev) => ({ ...prev, favorite: val }));
                    setFavSuggestions(
                      destinations.past.filter((name) =>
                        name.toLowerCase().includes(val.toLowerCase())
                      )
                    );
                  }}
                  onFocus={() => {
                    setFavSuggestions(destinations.past);
                  }}
                  onBlur={() => {
                    setTimeout(() => setFavSuggestions([]), 100);
                  }}
                  onKeyPress={(e) => handleKeyPress(e, "favorite")}
                />

                {favSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-40 overflow-auto">
                    {favSuggestions.map((name) => (
                      <li
                        key={name}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setDestinations((prev) => ({
                            ...prev,
                            favorite: [...prev.favorite, name],
                          }));
                          setSearchInputs((prev) => ({
                            ...prev,
                            favorite: "",
                          }));
                          setFavSuggestions([]);
                        }}
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                  {destinations.favorite.map((destination, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-100 rounded-lg px-4 py-1"
                    >
                      <span className="text-sm">{destination}</span>
                      <button
                        onClick={() =>
                          handleRemoveDestination("favorite", index)
                        }
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              <div className="text-right">
                <button
                  className="px-6 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition"
                  onClick={() => setStep(4)}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <div className="p-8 ">
              {/* Title */}
              <h1 className="text-3xl font-bold text-orange-600 mb-8 text-left">
                Travel & Experience Preferences
              </h1>

              {/* Preferred Transport */}
              <div className="mb-8 text-left">
                <h2 className="font-semibold  text-2xl mb-4">
                  Preferred Transport
                </h2>
                <div className="flex gap-3 flex-wrap">
                  {["Flight", "Train", "Road Trip", "Cruise"].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelectTransport(item)}
                      className={`px-4 py-2 border rounded-md shadow-sm hover:bg-gray-100 ${
                        selectedTransport === item
                          ? "bg-orange-500 text-white"
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Accommodation Type */}
              <div className="mb-8 text-left">
                <h2 className="font-semibold text-2xl mb-4">
                  Preferred Accommodation Type
                </h2>
                <div className="flex gap-3 flex-wrap">
                  {["Hotel", "Villa", "Camping", "Hostel", "Resort"].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => handleSelectAccommodation(item)}
                        className={`px-4 py-2 border rounded-md shadow-sm hover:bg-gray-100 ${
                          selectedAccommodation === item
                            ? "bg-orange-500 text-white"
                            : ""
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Top Interests & Activities */}
              <div className="mb-8 text-left">
                <h2 className="font-semibold text-2xl mb-4">
                  Top Interests & Activities
                </h2>
                <div className="flex gap-3 flex-wrap">
                  {[
                    "Arts & Museums",
                    "Music & Nightlife",
                    "Fitness & Wellness",
                    "Literature & Bookstores",
                    "Wildlife & Safari",
                    "Sports & Outdoor Activities",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelectInterest(item)}
                      className={`px-4 py-2 border rounded-md shadow-sm hover:bg-gray-100 ${
                        selectedInterest === item
                          ? "bg-orange-500 text-white"
                          : ""
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Continue Button */}
              <div className="absolute bottom-4 right-4">
                <button
                  className="px-6 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition"
                  onClick={handleFinalSubmit}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <div className="flex items-center justify-center  bg-white">
              <div className="text-center">
                <h1 className="text-4xl font-semibold text-orange-500 mb-4">
                  You’re all set!
                </h1>
                <p className=" pt-5  text-2xl text-gray-600 mb-6">
                  We’ve saved your preferences. Get ready for <br />
                  personalized travel recommendations
                </p>
                <button
                  onClick={() => {
                    setStep(2);
                    onClose();
                  }}
                  className="px-6 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TravelModal;
