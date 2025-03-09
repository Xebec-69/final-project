import React, { useState } from "react";
import TravelHistory from "./TravelHistory.jsx";
//import butterfly from "/images/ph_butterfly-light.png"; // Ensure correct path

const TravelModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedPreferences, setSelectedPreferences] = useState({
    travelStyle: null,
    tripDuration: null,
    budget: null,
    climate: null,
  });
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
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg"
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
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-lg"
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
                <div className="mb-6 text-left w-1/2">
                  <h3 className="text-lg font-medium mb-2">
                    Least Favorite Trip
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Destination"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      value={searchInputs.leastFavorite}
                      onChange={(e) =>
                        setSearchInputs((prev) => ({
                          ...prev,
                          leastFavorite: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => handleKeyPress(e, "leastFavorite")}
                    />
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
              </div>

              {/* Past Destinations Visited */}
              <div className="mb-6 text-left">
                <h3 className="text-lg font-medium mb-2">
                  Past Destinations Visited
                </h3>
                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder="Search Destination"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    value={searchInputs.past}
                    onChange={(e) =>
                      setSearchInputs((prev) => ({
                        ...prev,
                        past: e.target.value,
                      }))
                    }
                    onKeyPress={(e) => handleKeyPress(e, "past")}
                  />
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
              </div>

              {/* Favorite Past Trip */}
              <div className="mb-6 text-left">
                <h3 className="text-lg font-medium mb-2">Favorite Past Trip</h3>
                <div className="relative w-1/2">
                  <input
                    type="text"
                    placeholder="Search Destination"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    value={searchInputs.favorite}
                    onChange={(e) =>
                      setSearchInputs((prev) => ({
                        ...prev,
                        favorite: e.target.value,
                      }))
                    }
                    onKeyPress={(e) => handleKeyPress(e, "favorite")}
                  />
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
              </div>

              {/* Continue Button */}
              <div className="text-right">
                <button
                  className="bg-orange-500 text-white rounded-lg px-6 py-2 hover:bg-orange-600"
                  onClick={onClose}
                >
                  Continue
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
