export default function TravelHistory() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-orange-500 mb-6 text-left">
        Travel History & Experience
      </h2>

      <div className="flex justify-between gap-6">
        {/* Travel Companions */}
        <div className="mb-6 text-left w-1/2">
          <h3 className="text-lg font-medium mb-2">Travel Companions</h3>
          <div className="flex gap-2 flex-wrap">
            {["Solo", "Family", "Friends", "Partner", "Group Tour"].map(
              (companion) => (
                <button
                  key={companion}
                  className="border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {companion}
                </button>
              )
            )}
          </div>
        </div>

        {/* Least Favorite Trip */}
        <div className="mb-6 text-left w-1/2">
          <h3 className="text-lg font-medium mb-2">Least Favorite Trip</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Destination"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
        </div>
      </div>

      {/* Past Destinations Visited */}
      <div className="mb-6 text-left">
        <h3 className="text-lg font-medium mb-2">Past Destinations Visited</h3>
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search Destination"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
      </div>

      {/* Favorite Past Trip */}
      <div className="mb-6 text-left">
        <h3 className="text-lg font-medium mb-2">Favorite Past Trip</h3>
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search Destination"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
      </div>

      {/* Continue Button */}
      <div className="text-right">
        <button className="bg-orange-500 text-white rounded-full px-6 py-2 hover:bg-orange-600">
          Continue
        </button>
      </div>
    </div>
  );
}
