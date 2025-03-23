import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight: '500', subsets: ['latin'] })

export const metadata = {
  title: 'Brain Tumor Detection & Management',
  description: 'Medical platform for brain tumor detection and management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen">
          <div className="fixed h-100 inset-0 bg-white"></div>
          <main className="relative z-10 w-100 h-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
