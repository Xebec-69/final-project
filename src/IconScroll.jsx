import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IconScroll = () => {
  const scrollContainer = useRef(null);
  const [itemWidth, setItemWidth] = useState(78);
  const icons = [
    {
      icon: (
        <img
          src="images/8e507f16-4943-4be9-b707-59bd38d56309 1.svg"
          alt="Islands"
          className="h-6 w-6"
        />
      ),
      label: "Islands",
    },
    {
      icon: (
        <img
          src="images/10ce1091-c854-40f3-a2fb-defc2995bcaf 1.svg"
          alt="Beach"
          className="h-6 w-6"
        />
      ),
      label: "Beach",
    },
    {
      icon: (
        <img
          src="images/957f8022-dfd7-426c-99fd-77ed792f6d7a 1.svg"
          alt="Surfing"
          className="h-6 w-6"
        />
      ),
      label: "Surfing",
    },
    {
      icon: (
        <img
          src="images/33dd714a-7b4a-4654-aaf0-f58ea887a688 1.svg"
          alt="Historical homes"
          className="h-6 w-6"
        />
      ),
      label: "Historical homes",
    },
    {
      icon: (
        <img
          src="images/1d477273-96d6-4819-9bda-9085f809dad3 1.svg"
          alt="A-frames"
          className="h-6 w-6"
        />
      ),
      label: "A-frames",
    },
    {
      icon: (
        <img
          src="images/c9157d0a-98fe-4516-af81-44022118fbc7 1.svg"
          alt="Dammusi"
          className="h-6 w-6"
        />
      ),
      label: "Dammusi",
    },
    {
      icon: (
        <img
          src="images/89faf9ae-bbbc-4bc4-aecd-cc15bf36cbca 1.svg"
          alt="Domes"
          className="h-6 w-6"
        />
      ),
      label: "Domes",
    },
    {
      icon: (
        <img
          src="images/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd 1.svg"
          alt="Farms"
          className="h-6 w-6"
        />
      ),
      label: "Farms",
    },
    {
      icon: (
        <img
          src="images/ee9e2a40-ffac-4db9-9080-b351efc3cfc4 1.svg"
          alt="Tropical"
          className="h-6 w-6"
        />
      ),
      label: "Tropical",
    },

    {
      icon: (
        <img
          src="images/ed8b9e47-609b-44c2-9768-33e6a22eccb2 1.svg"
          alt="Top cities"
          className="h-6 w-6"
        />
      ),
      label: "Top cities",
    },
    {
      icon: (
        <img
          src="images/3fb523a0-b622-4368-8142-b5e03df7549b 1.svg"
          alt="Amazing pools"
          className="h-6 w-6"
        />
      ),
      label: "Amazing pools",
    },
    {
      icon: (
        <img
          src="images/7630c83f-96a8-4232-9a10-0398661e2e6f 1.svg"
          alt="Rooms"
          className="h-6 w-6"
        />
      ),
      label: "Rooms",
    },
    {
      icon: (
        <img
          src="images/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e 1.svg"
          alt="Treehouses"
          className="h-6 w-6"
        />
      ),
      label: "Treehouses",
    },
    {
      icon: (
        <img
          src="images/6ad4bd95-f086-437d-97e3-14d12155ddfe 1.svg"
          alt="Countryside"
          className="h-6 w-6"
        />
      ),
      label: "Top Cities",
    },
    {
      icon: (
        <img
          src="images/6ad4bd95-f086-437d-97e3-14d12155ddfe 1.svg"
          alt="Amazing pools"
          className="h-6 w-6"
        />
      ),
      label: "Amazing pools",
    },
    {
      icon: (
        <img
          src="images/3271df99-f071-4ecf-9128-eb2d2b1f50f0 1.svg"
          alt="Design"
          className="h-6 w-6"
        />
      ),
      label: "Design",
    },

    {
      icon: (
        <img
          src="https://a0.muscache.com/pictures/8b44f770-7156-4c7b-b4d3-d92549c8652f.jpg"
          alt="Airtic"
          className="h-6 w-6"
        />
      ),
      label: "Airtic",
    },
  ];

  useEffect(() => {
    const calculateItemWidth = () => {
      if (scrollContainer.current?.children?.[0]) {
        const firstItem = scrollContainer.current.children[0];
        const width = firstItem.offsetWidth;
        const style = window.getComputedStyle(firstItem);
        const spacing = parseInt(style.marginRight, 10) || 0;
        setItemWidth(width + spacing);
      }
    };

    calculateItemWidth();
    window.addEventListener("resize", calculateItemWidth);
    return () => window.removeEventListener("resize", calculateItemWidth);
  }, []);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({
        left: direction === "left" ? -itemWidth : itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-[75vw] p-4 relative ">
      {/* Scroll buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={() => scroll("left")}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 z-10 ml-2"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={() => scroll("right")}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 z-10 mr-2"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollContainer}
        className="flex overflow-x-hidden space-x-2 pl-10 pr-10"
      >
        {icons.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[70px] flex-shrink-0"
          >
            <img
              src={item.icon.props.src}
              alt={item.label}
              className="h-6 w-6"
              onLoad={() => {
                if (scrollContainer.current?.children?.[0]) {
                  const firstItem = scrollContainer.current.children[0];
                  const width = firstItem.offsetWidth;
                  const style = window.getComputedStyle(firstItem);
                  const spacing = parseInt(style.marginRight, 10) || 0;
                  setItemWidth(width + spacing);
                }
              }}
            />
            <span className="text-xs mt-1 text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconScroll;
