import React from "react";
import DisplayUserState from "./displayUserState";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
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
