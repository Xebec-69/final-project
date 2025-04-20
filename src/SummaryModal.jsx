// src/SummaryModal.jsx
import React from "react";

export default function SummaryModal({ pref, onClose, onEdit }) {
  if (!pref) return null;

  const {
    favorite_travel_style,
    trip_duration,
    budget_range,
    climate,
    travel_companions,
    past_destinations_visited,
    favorite_past_trip,
    least_favorite_trip,
    preferred_transport,
    preferred_accommodation_type,
    top_interests_activities,
  } = pref;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Your Saved Preferences</h2>
        <ul className="space-y-2 text-gray-800 mb-6">
          <li>
            <strong>Favorite Travel Style:</strong> {favorite_travel_style}
          </li>
          <li>
            <strong>Trip Duration:</strong> {trip_duration}
          </li>
          <li>
            <strong>Budget Range:</strong> {budget_range}
          </li>
          <li>
            <strong>Climate:</strong> {climate}
          </li>
          <li>
            <strong>Travel Companions:</strong>{" "}
            {travel_companions.split(",").join(", ")}
          </li>
          <li>
            <strong>Past Destinations Visited:</strong>{" "}
            {past_destinations_visited.split(",").join(", ")}
          </li>
          <li>
            <strong>Favorite Past Trip:</strong>{" "}
            {favorite_past_trip.split(",").join(", ")}
          </li>
          <li>
            <strong>Least Favorite Trip:</strong>{" "}
            {least_favorite_trip.split(",").join(", ")}
          </li>
          <li>
            <strong>Preferred Transport:</strong> {preferred_transport}
          </li>
          <li>
            <strong>Preferred Accommodation:</strong>{" "}
            {preferred_accommodation_type}
          </li>
          <li>
            <strong>Top Interests & Activities:</strong>{" "}
            {top_interests_activities.split(",").join(", ")}
          </li>
        </ul>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 rounded-md bg-customOrange text-white hover:bg-orange-600"
            onClick={() => {
              onClose();
              onEdit();
            }}
          >
            Edit Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
