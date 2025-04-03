import "./App.css";
import React, { useState } from "react";
import { Search, Sliders } from "lucide-react";
import Logo from "./Logo.jsx";
import Menu from "./Menu.jsx";
import Items from "./Items.jsx";
import IconScroll from "./IconScroll.jsx";
import PopupModal from "./PopupModal.jsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {/* Header Container */}
      <div className="flex items-center justify-between w-full px-8 py-4 relative">
        {/* Logo on the left */}
        <Logo />

        {/* Centered Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <span className="font-bold text-black">Home</span>
          <span className="mx-2 text-gray-400">|</span>
          <button
            className="text-customOrange font-semibold"
            onClick={() => setIsModalOpen(true)}
          >
            Let's personalize your trips!
          </button>
        </div>
        <Menu />
      </div>

      {/* Search bar section - remains centered below */}
      <div className="flex justify-center items-center mt-4">
        <div className="shadow w-1/2 rounded-full bg-white px-8 py-6 flex justify-between items-center">
          <div>
            <p>Where</p>
            <p className="text-sm opacity-50">Search Destination </p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>Check in</p>
            <p className="text-sm opacity-50">Add dates</p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>Check out</p>
            <p className="text-sm opacity-50">Add dates</p>
          </div>
          <div className="h-12 w-1 border-r-2 bg-gray-500"></div>
          <div>
            <p>Who</p>
            <p className="text-sm opacity-50">Add guests</p>
          </div>
          <div className="bg-customOrange p-4 rounded-full">
            <Search width={30} height={30} className="text-white" />
          </div>
        </div>
      </div>
      <div className="p-10">
        <div className="flex space-x-2 ">
          {/* Legacy Button */} <IconScroll />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center w-36  border border-customOrange text-customOrange px-4 py-2 rounded-lg shadow-sm hover:bg-orange-50"
          >
            <img
              src="/images/ph_butterfly-light.png"
              className="h-10 w-10"
              alt="a"
            />
            <span className="font-medium">Legacy</span>
          </button>
          <PopupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          {/* Filters Button */}
          <button className="flex items-center w-36 space-x-4 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <Sliders className="h-5 w-5" />
            <span className="font-medium">Filters</span>
          </button>
        </div>
      </div>
      <div className="sm:ml-[130px]  sm:mr-[80px] flex flex-wrap gap-8 p-2 justify-start">
        <Items
          images={[
            "https://a0.muscache.com/im/pictures/miso/Hosting-1176955419486517899/original/83a47318-f3f6-4579-94d5-71523787ff11.jpeg?im_w=1200",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1176955419486517899/original/1fc2607d-55cc-4f7a-871a-842c7eb3050f.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1176955419486517899/original/396f3add-24d3-46be-8f98-c6e35c14262e.jpeg?im_w=720",
          ]}
          title="Luxury Seafront Villa"
          location="Vis, Croatia"
          rating="4"
          price="710"
          description="Private cabin with stunning views"
        />
        <Items
          images={[
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image3.jpg",
          ]}
          title="Cozy Lake Cabin"
          location="Helsinki, Finland"
          rating="4.8"
          price="320"
          description="Private cabin with stunning views"
        />
        <Items
          images={[
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image3.jpg",
          ]}
          title="Lake Lohja"
          location=" Finland"
          rating="5"
          price="262"
          description="Private cabin with stunning views"
        />
        <Items
          images={[
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image3.jpg",
          ]}
          title=" Wild Hunter's Mountain Cabin"
          location="South Africa"
          rating="4.8"
          price="82"
          description="Private cabin with stunning views"
        />
        <Items
          images={[
            "https://example.com/image1.jpg",
            "https://example.com/image2.jpg",
            "https://example.com/image3.jpg",
          ]}
          title="Villa Perla"
          location="Luka, Croatia"
          rating="4.8"
          price="209"
          description="Private cabin with stunning views"
        />
      </div>
    </>
  );
}

export default App;
