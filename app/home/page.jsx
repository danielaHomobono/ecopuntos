import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Leaf, Trophy, Gift } from 'lucide-react';
import { getUsuarioActual } from '@/lib/getUsuarioActual';
import { frasesEco } from '@/lib/frasesEco';
import TextoAnimado from '@/app/components/TextoAnimado';
import Header from '@/app/components/Header';
import BannerExito from '@/app/components/BannerExito';

export default async function HomePage({ searchParams }) {
  const usuario = await getUsuarioActual();

  if (!usuario) {
    redirect('/login');
  }

  const params = await searchParams;
  const mostrarExito = params?.exito === 'true';

  return (
    <div className="min-h-screen bg-[#1a2744] flex flex-col">
      <Header />

      <div className="flex flex-1 flex-col items-center justify-center px-4 gap-6">

        {/* Banner de éxito (solo si viene de ?exito=true) */}
        {mostrarExito && <BannerExito />}

        {/* Header: nombre y puntos */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl shadow-md px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60 font-medium">Hola,</p>
            <p className="text-xl font-bold text-white">{usuario.nombre}</p>
          </div>
          <div className="bg-[#f4862c] rounded-xl px-4 py-2 text-center">
            <p className="text-2xl font-extrabold text-white">{usuario.puntos}</p>
            <p className="text-xs text-white/80 font-medium">puntos</p>
          </div>
        </div>

        {/* Frases animadas */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-2xl shadow-sm px-6 py-6">
          <TextoAnimado frases={frasesEco} />
        </div>

        {/* Botón principal */}
        <Link
          href="/home/foto"
          className="w-full max-w-md block text-center bg-[#f4862c] hover:bg-[#e07520] active:scale-95 transition-all duration-200 text-white font-bold text-lg rounded-2xl py-5 shadow-lg"
        >
          <span className="inline-flex items-center gap-2">
            <Leaf size={20} />
            Sumar puntos ahora
          </span>
        </Link>

        {/* Botón ranking */}
        <Link
          href="/ranking"
          className="w-full max-w-md block text-center border-2 border-white/30 text-white font-semibold rounded-2xl py-3 hover:bg-white/10 transition-colors"
        >
          <span className="inline-flex items-center gap-2">
            <Trophy size={18} />
            Ver ranking
          </span>
        </Link>

        {/* Botón premios */}
        <Link
          href="/premios"
          className="w-full max-w-md block text-center border-2 border-white/30 text-white font-semibold rounded-2xl py-3 hover:bg-white/10 transition-colors"
        >
          <span className="inline-flex items-center gap-2">
            <Gift size={18} />
            Ver premios
          </span>
        </Link>

      </div>
    </div>
  );
}
