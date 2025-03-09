import React from "react";
import { Menu } from "lucide-react";
import { CircleUser } from "lucide-react";

const ToggleButton = () => {
  return (
    <div className="flex items-center space-x-4 border rounded-full px-2 py-1 w-fit border-black">
      <Menu className="w-5 h-5" onClick={() => console.log("aa")} />
      <div className="relative w-10 h-10 bg-black rounded-full flex items-center justify-center">
        <span className="text-white ">
          <CircleUser width={30} height={30} />
        </span>
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          1
        </div>
      </div>
    </div>
  );
};

export default ToggleButton;
