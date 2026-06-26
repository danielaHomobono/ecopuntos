
export default function Header() {
  return (
    <header className="w-full bg-[#1a2744] px-6 py-3 flex items-center gap-3 shadow-md">
      <img
        src="/logo.jpeg"
        alt="Logo del instituto"
        width={40}
        height={40}
        className="object-contain"
      />
      <span className="text-white font-bold text-xl tracking-wide">
        Eco<span className="text-[#f4862c]">Puntos</span>
      </span>
    </header>
  );
}
