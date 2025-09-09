import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#1212] p-4 py-20">
      <h1 className="text-6xl font-bold text-yellow-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="header-auth">
        <Link
          to="/"
          className="px-6 !py-3 md:!py-5 signup-btn text-white rounded-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
