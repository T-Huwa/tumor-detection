import { Header } from "@/components/header"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const navLinks = [
    { href: "/user", label: "Home" },
    { href: "/user/analyze", label: "Prediction" },
    { href: "/user/results", label: "Scan Results" },
    { href: "/user/profile", label: "User Profile" },
  ]

  return (
    <>
      <Header links={navLinks} />
      <div className="min-h-screen w-full">
        {children}
      </div>
    </>
  )
}
