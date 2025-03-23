import * as Avatar from '@radix-ui/react-avatar'
import * as Label from '@radix-ui/react-label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Image from 'next/image'

interface User{
    profilePhoto: string,
    fname: string,
    sname: string,
    hospital: string,
    specialization: string,
    experience: number,
    email: string,
}

export default function ProfileCard({user} : {user: User}){

    // Ndekuti apa pabwela logic yopanga insert user ku db

    return (
        <>
    <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal and professional details</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center space-x-8 mb-6">
            <Avatar.Root className="w-32 h-32 rounded-full overflow-hidden border m-2">
              <Avatar.Image
                src={user.profilePhoto}
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

            <div className='m-2 p-4'>
              <Label.Root htmlFor="photo" className="block mb-2 font-medium">Upload a different photo:</Label.Root>
              <input type="file" id="photo" className="block" />
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <Label.Root htmlFor="firstName" className="block mb-1">First Name</Label.Root>
              <input id="firstName" className="border rounded w-full p-2" value={user.fname} />
            </div>

            <div>
              <Label.Root htmlFor="lastName" className="block mb-1">Last Name</Label.Root>
              <input id="lastName" className="border rounded w-full p-2" value={user.sname} />
            </div>

            <div>
              <Label.Root htmlFor="hospital" className="block mb-1">Associated Hospital</Label.Root>
              <input id="hospital" className="border rounded w-full p-2" value={user.hospital}/>
            </div>

            <div>
              <Label.Root htmlFor="specialization" className="block mb-1">Specialization</Label.Root>
              <input id="specialization" className="border rounded w-full p-2" value={user.specialization}/>
            </div>

            <div>
              <Label.Root htmlFor="experience" className="block mb-1">Years of Experience</Label.Root>
              <input id="experience" type="number" className="border rounded w-full p-2" value={user.experience} />
            </div>

            <div>
              <Label.Root htmlFor="email" className="block mb-1">Email</Label.Root>
              <input id="email" className="border rounded w-full p-2" value={user.email}/>
            </div>

            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Update</button>
          </form>
        </CardContent>
      </Card>
        </>
    )
}