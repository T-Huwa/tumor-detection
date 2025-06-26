"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, File, LocateIcon, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Auth } from "@/app/admin/users/page";
import { useRouter } from "next/navigation";

interface Doctor {
  id: number;
  name: string;
}

export default function AnalyzePage() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const router = useRouter();

  const authString = localStorage.getItem("auth");

  const auth: Auth | null = authString ? JSON.parse(authString) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/cases/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.access_token}`,
        },
        body: JSON.stringify({
          full_name: fullName,
          age: parseInt(age),
          address: address,
          mobile: mobile,
          doctor_id: parseInt(selectedDoctor),
          status: "created",
          o_image: null,
          p_image: null,
          prediction: null,
          pred_probability: null,
          nurse_feedback: null,
          nurse_id: auth?.id,
          model_diagnosis: null,
          recommended_test: null,
          doctor_feedback: null,
          doctor_decision: null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create case");
      }

      setSuccess("Case Created successfully! Redirecting...");
      router.push("/user/cases");
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/doctors`, {
          headers: {
            Authorization: `Bearer ${auth?.access_token}`,
          },
        });
        const data: Doctor[] = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto pt-10">
      <div className="mx-auto px-2 md:px-4 my-6 md:py-2 md:pr-0 max-w-xl border border-gray-200 rounded-md">
        <div className="bg-white/20 p-2 md:px-4 ">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Create new Patient Case
            </CardTitle>
          </CardHeader>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-800 text-sm">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center text-green-800 text-sm">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {success}
            </div>
          )}

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="full_name" className="text-gray-800">
                  Patient Full Name
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="age" className="text-gray-800">
                  Patient Age
                </Label>
                <div className="relative">
                  <File className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="age"
                    type="number"
                    placeholder="18"
                    className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-gray-800">
                  Patient Address
                </Label>
                <div className="relative">
                  <LocateIcon className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Textarea
                    id="address"
                    placeholder="1234 Hospital Street"
                    className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mobile" className="text-gray-800">
                  Mobile Number
                </Label>
                <div className="relative">
                  <File className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="0991234567"
                    className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="doctor" className="text-gray-800">
                  Select Doctor
                </Label>
                <Select onValueChange={setSelectedDoctor}>
                  <SelectTrigger className="bg-white/60 border-gray-300">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>

                  {doctors && (
                    <SelectContent>
                      {doctors.map((doctor) => (
                        <SelectItem
                          key={doctor.id}
                          value={doctor.id.toString()}
                        >
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  )}
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
