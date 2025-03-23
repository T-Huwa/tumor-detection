'use client'

import ProfileCard from "@/components/profile-card"

export default function UserProfile() {

  const user = {
    profilePhoto: "/placeholder.svg?height=300&width=300",
    fname: 'John',
    sname: 'Doctor',
    hospital: 'Central As Well',
    specialization: 'Glaucoma',
    experience: 17,
    email: 'johnDoe@email.com',
  }

  return (
    <main className="container w-screen px-6 py-16">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      <ProfileCard user={user} />

    </main>
  )
}
