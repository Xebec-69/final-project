import React from "react";

const Logo = () => {
  const handleRefresh = () => {
    window.location.reload(); // Reload the page
  };

  return (
    <div className="flex items-center">
      <div className="relative w-12 h-12 rotate-12 flex items-center justify-center pr-3">
        <img
          src="images/Vector.svg"
          alt="Logo"
          className="w-10 h-10 cursor-pointer hover:opacity-80 transition rounded-lg"
          onClick={handleRefresh}
        />
      </div>
      <span
        className="text-customOrange text-lg font-semibold -ml-3 cursor-pointer transition"
        onClick={handleRefresh}
      >
        GoGenius
      </span>
    </div>
  );
};

export default Logo;
