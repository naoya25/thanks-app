"use client";
import { googleLogin } from "@/features/auth/googleLogin";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
