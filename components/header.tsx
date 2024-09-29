import React from "react";
import DisplayUserState from "./displayUserState";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <img
              className="h-12 w-12 rounded-full"
              src="https://via.placeholder.com/100"
              alt="Logo"
            />
          </Link>
          <Link href="/">
            <h1 className="text-white text-3xl font-bold tracking-wide">
              Thanks App
            </h1>
          </Link>
        </div>
        <DisplayUserState />
      </div>
    </header>
  );
};

export default Header;
