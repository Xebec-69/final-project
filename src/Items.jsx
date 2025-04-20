import React, { useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";

const Items = ({
  images,
  title,
  location,
  rating,
  price,
  description,

  id,
  onRate,
  isLoggedIn = false,

  canRate,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [myRating, setMyRating] = useState(null);

  const [isFav, setIsFav] = useState(false);
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

  const handlePick = (value) => {
    if (!isLoggedIn) return; // extra safety
    setMyRating(value);
    setRatingOpen(false);
    onRate(id, value); // user.id is no longer null
  };
  return (
    <div className="m-1 ml-6  pl-2">
      <div className="  w-[302px] h-[287px] rounded-2xl shadow-lg overflow-hidden ">
        <div className="relative">
          {canRate && (
            <>
              <button
                onClick={() => setRatingOpen((o) => !o)}
                className="absolute top-2 left-2 bg-white bg-opacity-90 text-sm font-medium px-3 py-1 rounded-full shadow-sm z-20 hover:bg-opacity-100 transition"
              >
                {myRating ? `★ ${myRating}` : "Rate"}
              </button>
              {ratingOpen && (
                <div className="absolute top-10 left-2 bg-white rounded-lg shadow-lg p-2 z-20">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => handlePick(n)}
                      className="px-2 py-1 text-sm hover:bg-gray-100 rounded"
                    >
                      {n} <Star className="inline h-4 w-4 text-yellow-500" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
          <img
            src={images[currentImageIndex]}
            alt={title}
            className="w-[302px] h-[287px] object-cover cursor-pointer"
          />
          <button className="absolute top-2 right-2  p-1  shadow">
            <Heart
              onClick={() => setIsFav((f) => !f)}
              className={`absolute top-2 right-2 cursor-pointer transition ${
                isFav ? "text-white fill-red-600" : "text-white "
              }`}
            />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-300 bg-opacity-25 p-1 rounded-full shadow"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-300 bg-opacity-25  p-1 rounded-full shadow"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      {/* Content section with title + rating on one line */}
      <div className="px-2 pt-6 w-[302px]">
        <div className="flex justify-between items-center">
          <h2 className="text-lg SF Pro Display-Bold text-gray-800">{title}</h2>
          <span className="flex items-center SF Pro Display-Regular space-x-1 text-lg text-black fill-black">
            <img src="images/Star.svg" />
            <span>{rating}</span>
          </span>
        </div>
        {/* then the rest of your fields */}
        <p className="text-sm SF Pro Display-Regular text-gray-600 mt-1">
          {location}
        </p>
        <p className="text-sm mt-2  SF Pro Display-Medium text-gray-500 clamp-3 w-[302px] overflow-hidden clamp-3">
          {description}
        </p>

        <div className="mt-2 SF Pro Display-Regular text-lg text-gray-800">
          {price}{" "}
        </div>
      </div>
    </div>
  );
};

export default Items;
