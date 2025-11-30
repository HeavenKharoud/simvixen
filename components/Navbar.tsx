import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-black">
      {/* Logo */}
      <Link href="/" className="text-3xl font-bold text-[#EB0029] tracking-wider">
        SIMVIXEN
      </Link>

      {/* Menu */}
      <div className="flex gap-8 text-lg">
        <Link href="/dashboard" className="hover:text-[#EB0029] transition">
          Dashboard
        </Link>
        <Link href="/schedule" className="hover:text-[#EB0029] transition">
          Schedule
        </Link>
        <Link href="/news" className="hover:text-[#EB0029] transition">
          News
        </Link>
        <Link href="/members" className="hover:text-[#EB0029] transition">
          Members
        </Link>
        <Link href="/support" className="hover:text-[#EB0029] transition">
          Support
        </Link>
      </div>
    </nav>
  );
}
