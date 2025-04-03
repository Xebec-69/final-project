import React, { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const Items = ({ images, title, location, rating, price, description }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openImage = () => {
    window.open(images[currentImageIndex], "_blank");
  };

  return (
    <div className="w-64 rounded-2xl shadow-lg overflow-hidden bg-white">
      {/* Image Section */}
      <div className="relative">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-56 object-cover cursor-pointer"
          onClick={openImage}
        />
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-xs font-medium shadow">
          Guest Favorite
        </div>
        <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-600">⭐ {rating}</span>
          <span className="text-lg">${price} / night</span>
        </div>
      </div>
    </div>
  );
};

export default Items;
