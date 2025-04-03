import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Search, Sliders } from "lucide-react";
import Logo from "./Logo.jsx";
import Menu from "./Menu.jsx";
import Items from "./Items.jsx";
import IconScroll from "./IconScroll.jsx";
import PopupModal from "./PopupModal.jsx";
import ListingDetails from "./ListingDetails.jsx"; // Import the new component

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between w-full px-8 py-4 relative">
        <Logo />
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

      {/* Search Bar */}
      <div className="flex justify-center items-center mt-4">
        <div className="shadow w-1/2 rounded-full bg-white px-8 py-6 flex justify-between items-center">
          <div>
            <p>Where</p>
            <p className="text-sm opacity-50">Search Destination</p>
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

      {/* Listings */}
      <div className="p-10">
        <div className="flex space-x-2">
          <IconScroll />
          <PopupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <button className="flex items-center w-36 space-x-4 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <Sliders className="h-5 w-5" />
            <span className="font-medium">Filters</span>
          </button>
        </div>
      </div>

      <div className="sm:ml-[130px] sm:mr-[80px] flex flex-wrap gap-8 p-2 justify-start">
        <Items
          id={1}
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
          id={1}
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
          id={1}
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
          id={1}
          images={[
            "https://a0.muscache.com/im/pictures/95b4b48b-6a13-4500-af3b-6aa66dc579b4.jpg?im_w=960",
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
          id={1}
          images={[
            "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM2NDQ4ODA5MjU0MDI3NDEyNA==/original/99f26bb6-d500-443f-a646-feeddfd9ecdd.jpeg?im_w=960",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1176955419486517899/original/1fc2607d-55cc-4f7a-871a-842c7eb3050f.jpeg?im_w=720",
            "https://a0.muscache.com/im/pictures/miso/Hosting-1176955419486517899/original/396f3add-24d3-46be-8f98-c6e35c14262e.jpeg?im_w=720",
          ]}
          title="Luxury Seafront Villa"
          location="Vis, Croatia"
          rating="4"
          price="710"
          description="Private cabin with stunning views"
        />
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Show MainPage only if not on listing details */}
      <Route path="/" element={<MainPage />} />
      <Route path="/listing/:id" element={<ListingDetails />} />
    </Routes>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
