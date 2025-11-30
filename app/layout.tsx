import './globals.css'
import { Orbitron } from 'next/font/google'
import Navbar from "@/components/Navbar";

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
})

export const metadata = {
  title: 'SIMVIXEN',
  description: 'Race Simulation Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={`${orbitron.className} bg-black text-white`}>
  <Navbar />
  {children}
</body>

    </html>
  )
}
