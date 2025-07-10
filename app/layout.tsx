import "./globals.css";
import Progress from "@/components/progress";

export const metadata = {
  title: "Brain Tumor Detection & Management",
  description: "Medical platform for brain tumor detection and management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen">
          <Progress>
            <div className="fixed h-100 inset-0 bg-white"></div>
            <main className="relative z-10 w-100 h-100">{children}</main>
          </Progress>
        </div>
      </body>
    </html>
  );
}
