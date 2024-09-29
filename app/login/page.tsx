"use client";
import Header from "@/components/header";
import { googleLogin } from "@/features/auth/googleLogin";
import { Google } from "@mui/icons-material";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="p-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Welcome to Our App
        </h2>
        <div className="text-center">
          <button
            onClick={googleLogin}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <Google className="mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
