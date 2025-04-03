import React, { useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import Menu from "./Menu.jsx";

const ListingDetails = () => {
  const [listing, setListing] = useState(null);

  useEffect(() => {
    // Get listing data from localStorage
    const storedListing = JSON.parse(localStorage.getItem("listingData"));
    setListing(storedListing);
  }, []);

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

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold">{listing.title}</h1>
        <p className="text-gray-600">{listing.location}</p>
        <p className="mt-2">{listing.description}</p>
        <p className="mt-2">
          ⭐ {listing.rating} - ${listing.price} per night
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {listing.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Listing ${index}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
