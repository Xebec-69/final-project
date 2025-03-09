import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative w-16 h-16  rotate-12 flex items-center justify-center">
        <img
          src="/images/ph_butterfly-light.png"
          alt="Logo"
          className="w-12 h-12 object-contain"
        />
      </div>
      <span className="text-orange-500 text-xl font-semibold -ml-4">
        GoGenius
      </span>
    </div>
  );
};

export default Logo;
