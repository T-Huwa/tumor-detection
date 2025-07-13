"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  LockKeyhole,
  AlertCircle,
  User,
  ChevronDown,
  FileUser,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectIcon, SelectTrigger } from "@radix-ui/react-select";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      if (data.access_token) {
        setSuccess("Login Successful. Redirecting...");

        setEmail("");
        setPassword("");

        localStorage.setItem("auth", JSON.stringify(data));
        if (data.role === "nurse") router.push("/user");
        else router.push("/" + data.role);
      } else {
        setError("Authentication failed. Please check your credentials.");
      }
    } catch (error: any) {
      setError(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 4) {
      setError("The password should have a minimum length of 4 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Password and Comfirm password do not match. Try again!");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          full_name: name,
          password: password,
          role: role,
          phone: phone,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Registration failed");
      }

      setSuccess(
        "Registration request submitted succcessfully! You will be notified once it is approved."
      );
      setEmail("");
      setName("");
      setPassword("");
      setConfirm("");
      setPhone("");
      setRole("");
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      {/*style={{ backgroundImage: "url('/your-background-image.jpg')" }}*/}
      <div className="relative w-[700px] h-[600px] rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm bg-white/10">
        {/* Main Form Section */}
        <div
          className={`overflow-y-auto absolute top-0 w-[500px] h-full transition-all duration-700 ease-in-out bg-white/20 py-2 ${
            isLogin ? "left-0 pl-2" : "left-[200px] pr-2"
          }`}
        >
          <div
            className={`bg-white/30 h-full p-2 md:p-8 ${
              isLogin ? "rounded-l-sm" : "rounded-r-sm"
            }`}
          >
            <CardHeader className="mb-6">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Brain Tumor Detection & Management
              </CardTitle>
              <p className="text-center text-gray-700">
                {isLogin ? "Login" : "Register"}
              </p>
            </CardHeader>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-800 text-sm">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-red-200 rounded-md flex items-center text-green-800 text-sm">
                <Check className="h-4 w-4 mr-2 flex-shrink-0" />
                {success}
              </div>
            )}

            <CardContent className="overflow-y-auto">
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-800">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="doctor@hospital.med"
                        className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="pb-5">
                    <Label htmlFor="password" className="text-gray-800">
                      Password
                    </Label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Authenticating..." : "Sign In"}
                  </Button>
                  {/* <Link
                    href={"/user"}
                    className="p-2 mt-2 w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full"
                  >
                    {isLoading ? "Authenticating..." : "Sign In"}
                  </Link> */}
                </form>
              ) : (
                <form
                  onSubmit={handleRegisterSubmit}
                  className="space-y-4 overflow-y-auto"
                >
                  <div>
                    <Label htmlFor="name" className="text-gray-800">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Dr. John Doe"
                        className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-email" className="text-gray-800">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="doctor@hospital.med"
                        className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-phone" className="text-gray-800">
                      Phone Number (Optional)
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="doctor@hospital.med"
                        className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-role" className="text-gray-800">
                      Role
                    </Label>
                    <div className="relative">
                      <FileUser className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <div className="pl-10 bg-white/60 rounded-md border-gray-300 focus:border-blue-400">
                        <Select onValueChange={(value) => setRole(value)}>
                          <div className="py-2">
                            <SelectTrigger className="w-full flex border-gray-300 focus:border-blue-400">
                              <SelectValue
                                placeholder="Select A Role"
                                className="flex-1 items-start"
                              />
                              <ChevronDown />
                            </SelectTrigger>
                          </div>
                          <SelectContent>
                            <SelectItem value="nurse">Nurse</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* <Input
                        id="register-email"
                        type="email"
                        placeholder="doctor@hospital.med"
                        className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      /> */}
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="register-password"
                      className="text-gray-800"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input
                        id="register-password"
                        type="password"
                        className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="register-confirm" className="text-gray-800">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input
                        id="register-confirm"
                        type="password"
                        className="pl-10 bg-white/60 border-gray-300 focus:border-blue-400"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </form>
              )}
            </CardContent>
          </div>
        </div>

        {/* Side Panel */}
        <div
          className={`absolute top-0 h-full w-[200px] bg-black/40 text-white flex flex-col justify-center items-center p-6 space-y-4 transition-all duration-700 ease-in-out ${
            isLogin ? "left-[500px]" : "left-0"
          }`}
        >
          {isLogin ? (
            <>
              <h3 className="text-lg font-semibold">Register</h3>
              <p className="text-center text-sm">
                Sign up to create your account
              </p>
              <Button
                className="bg-amber-500 hover:bg-amber-600 w-full"
                onClick={toggleForm}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold">Login</h3>
              <p className="text-center text-sm">Already have an account?</p>
              <Button
                className="bg-amber-500 hover:bg-amber-600 w-full"
                onClick={toggleForm}
              >
                Sign In
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
