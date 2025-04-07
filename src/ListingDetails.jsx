import React, { useEffect, useState } from "react";
import Logo from ".Logo.jsx";
import Menu from ".Menu.jsx";

const ListingDetails = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get listing data from localStorage
    const storedListing =
      JSON.parse(localStorage.getItem("listingData")) || null;
    setListing(storedListing);
    setLoading(false);
  }, []);

  if (loading) {
    return <h2 className="text-center text-xl mt-10">Loading listing...</h2>;
  }

  if (!listing) {
    return <h2 className="text-center text-xl mt-10">Listing not found.</h2>;
  }

  return (
    <>
      {/* Header with Logo and Menu */}
      <div className="flex justify-between items-center px-8 py-4">
        <Logo /> {/* Positioned on the left */}
        <Menu /> {/* Positioned on the right */}
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mt-1">
          {listing?.title || "No title available"}
        </h1>
        <p className="mt-2">
          ⭐ {listing?.rating ?? "No rating"} - ${listing?.price ?? "N/A"} per
          night
        </p>
        <p className="text-gray-600">
          {listing?.location || "Unknown location"}
        </p>
        <p className="mt-2">
          {listing?.description || "No description available."}
        </p>

        {/* Image Gallery - Custom Layout */}
        {listing?.images?.length > 0 ? (
          <div className="grid grid-cols-3 grid-rows-2 gap-2 mt-4 h-[500px]">
            {/* Large Main Image - Square */}
            <div className="col-span-2 row-span-2">
              <img
                src={listing.images[0]}
                alt={`Main image of ${listing?.title || "listing"}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Smaller Images - Surrounding the Main Image */}
            {listing.images.slice(1, 5).map((image, index) => (
              <div key={index} className="col-span-1 row-span-1">
                <img
                  src={image}
                  alt={`Image ${index + 2} of ${listing?.title || "listing"}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}

            {/* "Show All Photos" Button (Last Slot) */}
            <div className="col-span-1 row-span-1 flex justify-center items-center bg-white shadow-md rounded-lg"></div>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No images available.</p>
        )}
      </div>
    </>
  );
};

export default ListingDetails;
