import Hero from "@/components/hero";

export default function DashboardPage() {
  return (
    <div
      className="absolute overflow-auto md:fixed md:overscroll-hidden min-h-screen bg-[url('/home-bg.jpg')] bg-no-repeat bg-cover bg-center"
    >
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  );
}