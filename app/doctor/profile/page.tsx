"use client";

import { useEffect, useState } from "react";
import ProfileCard from "@/components/profile-card";

interface UserData {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  phone?: string;
  is_available: boolean;
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authString = localStorage.getItem("auth");
        if (!authString) {
          setError("No authentication found");
          return;
        }

        const auth = JSON.parse(authString);
        const response = await fetch(
          `${process.env.BACKEND_URL}/profile/${auth.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.access_token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <main className="container w-screen px-6 py-16">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading profile...</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container w-screen px-6 py-16">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="container w-screen px-6 py-16">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      {userData && <ProfileCard user={userData} />}
    </main>
  );
}
