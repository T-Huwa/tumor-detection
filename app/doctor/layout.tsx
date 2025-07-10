import { Header } from "@/components/header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navLinks = [
    { href: "/doctor", label: "Home" },
    { href: "/doctor/cases", label: "Alloted Cases" },
    { href: "/doctor/profile", label: "User Profile" },
  ];
  return (
    <>
      <Header links={navLinks} />
      <div className="min-h-screen w-full">{children}</div>
    </>
  );
}
