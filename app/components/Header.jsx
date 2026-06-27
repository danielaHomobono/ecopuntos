
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function Header({ showLogout }) {
  return (
    <header className="w-full bg-[#1a2744] px-6 py-3 flex items-center justify-between shadow-md">
      <Link href="/home" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
        <img
          src="/logo.jpeg"
          alt="Logo del instituto"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <span className="text-white font-bold text-xl tracking-wide">
          Eco<span className="text-[#f4862c]">Puntos</span>
        </span>
      </Link>
      {showLogout && <LogoutButton />}
    </header>
  );
}
