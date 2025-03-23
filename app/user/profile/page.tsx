'use client'

import ProfileCard from "@/components/profile-card"

export default function UserProfile() {

  const user = {
    profilePhoto: "/placeholder.svg?height=300&width=300",
    fname: 'John',
    sname: 'Doe',
    hospital: 'Central',
    specialization: 'Glaucome',
    experience: 12,
    email: 'johnDoe@john.com',
  }

  return (
    <main className="container w-screen px-6 py-16">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      <ProfileCard user={user} />

    </main>
  )
}
