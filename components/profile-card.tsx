import * as Avatar from "@radix-ui/react-avatar";
import * as Label from "@radix-ui/react-label";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  phone?: string;
  is_available: boolean;
}

export default function ProfileCard({ user }: { user: User }) {
  const [isAvailable, setIsAvailable] = useState(user.is_available);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const handleAvailabilityToggle = async (checked: boolean) => {
    setIsUpdating(true);
    setMessage("");

    try {
      const authString = localStorage.getItem("auth");
      if (!authString) {
        throw new Error("No authentication found");
      }
      const response = await fetch(
        `${process.env.BACKEND_URL}/profile/availability`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.id, is_available: checked }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update availability");
      }

      const data = await response.json();
      setIsAvailable(checked);
      setMessage(data.msg || "Availability updated successfully");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
      // Revert the switch if there was an error
      setIsAvailable(!checked);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            View and update your personal and professional details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center space-x-8 mb-6">
            <Avatar.Root className="w-32 h-32 rounded-full overflow-hidden border m-2">
              <Avatar.Image
                src="/placeholder.svg?height=300&width=300"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <Avatar.Fallback className="flex items-center justify-center w-full h-full bg-gray-200">
                <Image
                  width={300}
                  height={300}
                  src="/placeholder.svg?height=300&width=300"
                  alt="Placeholder"
                  className="w-full h-full object-cover"
                />
              </Avatar.Fallback>
            </Avatar.Root>

            <div className="m-2 p-4">
              <Label.Root htmlFor="photo" className="block mb-2 font-medium">
                Upload a different photo:
              </Label.Root>
              <input type="file" id="photo" className="block" />
            </div>
          </div>

          {/* Availability Toggle for Doctors */}
          {user.role === "doctor" && (
            <div className="mb-6 p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <Label.Root className="text-lg font-medium text-blue-900">
                    Availability Status
                  </Label.Root>
                  <p className="text-sm text-blue-700 mt-1">
                    Toggle your availability for new case assignments
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`text-sm font-medium ${
                      isAvailable ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isAvailable ? "Available" : "Unavailable"}
                  </span>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={handleAvailabilityToggle}
                    disabled={isUpdating}
                  />
                </div>
              </div>
              {message && (
                <div
                  className={`mt-3 text-sm ${
                    message.includes("Error")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label.Root htmlFor="fullName" className="block mb-1 font-medium">
                Full Name
              </Label.Root>
              <input
                id="fullName"
                className="border rounded w-full p-2 bg-gray-50"
                value={user.full_name}
                readOnly
              />
            </div>

            <div>
              <Label.Root htmlFor="email" className="block mb-1 font-medium">
                Email
              </Label.Root>
              <input
                id="email"
                className="border rounded w-full p-2 bg-gray-50"
                value={user.email}
                readOnly
              />
            </div>

            <div>
              <Label.Root htmlFor="role" className="block mb-1 font-medium">
                Role
              </Label.Root>
              <input
                id="role"
                className="border rounded w-full p-2 bg-gray-50 capitalize"
                value={user.role}
                readOnly
              />
            </div>

            <div>
              <Label.Root htmlFor="phone" className="block mb-1 font-medium">
                Phone Number
              </Label.Root>
              <input
                id="phone"
                className="border rounded w-full p-2 bg-gray-50"
                value={user.phone || "Not provided"}
                readOnly
              />
            </div>

            <div>
              <Label.Root htmlFor="status" className="block mb-1 font-medium">
                Account Status
              </Label.Root>
              <input
                id="status"
                className={`border rounded w-full p-2 ${
                  user.is_active
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
                value={user.is_active ? "Active" : "Inactive"}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
