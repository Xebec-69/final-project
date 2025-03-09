import React from "react";
import { Heart } from "lucide-react";

const Items = ({ image, title, location, rating, price, description }) => {
  return (
    <div className="w-64 rounded-2xl shadow-lg overflow-hidden bg-white">
      {/* Image Section */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium shadow">
          Guest Favorite
        </div>
        <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">⭐ {rating}</span>
          <span className="text-lg font-bold">${price} / night</span>
        </div>
      </div>
    </div>
  );
};

export default Items;
