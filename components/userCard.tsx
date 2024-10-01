"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@/utils/hooks/useUser";

const UserCard: React.FC = () => {
  const { user, loading, error } = useUser();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <div>No user is logged in</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center space-x-4">
        <Image
          className="rounded-full object-cover"
          width={64}
          height={64}
          src={user.user_metadata.avatar_url}
          alt="User Avatar"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.user_metadata.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
