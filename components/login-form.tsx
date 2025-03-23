"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, LockKeyhole, AlertCircle } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    try {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Login attempt with:", email)
    } catch {
      setError("Authentication failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-background-image.jpg')" }}>
      <div className="flex flex-col md:flex-row w-[700px] rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm bg-white/10">
        <div className="flex-1 p-2 md:pl-4 md:py-4 md:pr-0">
          <div className="bg-white/20 p-2 md:p-8">
          <CardHeader className="mb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">Brain Tumor Detection & Management</CardTitle>
            <p className="text-center text-gray-700">Login</p>
          </CardHeader>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-800 text-sm">
              <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-800">Email</Label>
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

              <div>
                <Label htmlFor="password" className="text-gray-800">Password</Label>
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
            </form>
          </CardContent>
          </div>
        </div>

        <div className="w-full md:w-[200px] bg-black/40 text-white flex flex-col justify-center items-center p-6 space-y-4">
          <h3 className="text-lg font-semibold">Register</h3>
          <p className="text-center text-sm">Sign up to create your account</p>
          <Button className="bg-amber-500 hover:bg-amber-600 w-full">Sign Up</Button>
        </div>
      </div>
    </div>
  )
}