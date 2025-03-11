import React from "react";

const Logo = () => {
  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };
  return (
    <div className="flex items-center">
      <div className="relative w-16 h-16  rotate-12 flex items-center justify-center">
        <img
          src="/images/ph_butterfly-light.png"
          alt="Logo"
          className="w-12 h-12 cursor-pointer hover:opacity-80 transition rounded-lg"
          onClick={handleRefresh}
        />
      </div>
      <span
        className="text-customOrange text-xl font-semibold -ml-4 cursor-pointer transition"
        onClick={handleRefresh}
      >
        GoGenius
      </span>
    </div>
  );
};

export default Logo;
