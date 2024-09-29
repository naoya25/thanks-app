"use client";
import { useUser } from "@/utils/hooks/useUser";
import Link from "next/link";

export default function DisplayUserState() {
  const { user, loading, error } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return (
      <div>
        <Link href="/login">Login</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Logged in as: {user.email ?? "No email provided"}</h1>
      <p>User ID: {user.id}</p>
    </div>
  );
}
