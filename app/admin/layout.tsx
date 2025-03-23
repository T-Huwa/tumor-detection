import { Header } from "@/components/header"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const navLinks = [
        { href: "/admin", label: "Dashboard" },
        { href: "/admin/users", label: "View Users" },
        { href: "/admin/panel", label: "Admin Panel" },
        { href: "/admin/data", label: "Download Data" },
      ]
  return (
    <>
      <Header links={navLinks} />
      <div className="min-h-screen w-full pt-10">
        {children}
      </div>
    </>
  )
}
