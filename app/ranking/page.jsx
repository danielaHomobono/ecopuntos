import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Trophy, Star } from 'lucide-react';
import { getUsuarioActual } from '@/lib/getUsuarioActual';
import { getPrisma } from '@/lib/db';
import Header from '@/app/components/Header';

export default async function RankingPage() {
  const usuario = await getUsuarioActual();

  if (!usuario) {
    redirect('/login');
  }

  // Consulta directa a Prisma (sin pasar por fetch HTTP)
  const prisma = getPrisma();

  const top20 = await prisma.user.findMany({
    select: { id: true, nombre: true, puntos: true },
    orderBy: { puntos: 'desc' },
    take: 20,
  });

  // Verificar si el usuario logueado está en el top 20
  const posicionEnTop = top20.findIndex((u) => u.id === usuario.id);
  const usuarioEnTop = posicionEnTop !== -1;

  // Si no está en el top 20, buscar su posición real
  let posicionReal = null;
  if (!usuarioEnTop) {
    const usuariosConMasPuntos = await prisma.user.count({
      where: { puntos: { gt: usuario.puntos } },
    });
    posicionReal = usuariosConMasPuntos + 1;
  }

  return (
    <div className="min-h-screen bg-[#1a2744] flex flex-col">
      <Header showLogout={true} />

      <div className="flex flex-col items-center px-4 py-8 gap-6">

        {/* Título */}
        <div className="w-full max-w-lg text-center">
          <h1 className="text-2xl font-extrabold text-white inline-flex items-center gap-2">
            <Trophy size={26} className="text-[#f4862c]" />
            Ranking EcoPuntos
          </h1>
          <p className="text-sm text-white/50 mt-1">Top 20 guardianes del planeta</p>
        </div>

        {/* Lista del ranking */}
        <div className="w-full max-w-lg flex flex-col gap-2">
          {top20.map((participante, index) => {
            const esUsuarioActual = participante.id === usuario.id;
            const posicion = index + 1;

            return (
              <div
                key={participante.id}
                className={`flex items-center gap-4 rounded-2xl px-5 py-3 transition-all ${
                  esUsuarioActual
                    ? 'bg-[#f4862c]/20 border-2 border-[#f4862c]'
                    : 'bg-white/10 border border-white/10'
                }`}
              >
                {/* Posición */}
                <div className="w-8 flex items-center justify-center shrink-0">
                  {posicion === 1 ? (
                    <span className="w-7 h-7 rounded-full bg-yellow-400 text-yellow-900 text-xs font-extrabold flex items-center justify-center">1</span>
                  ) : posicion === 2 ? (
                    <span className="w-7 h-7 rounded-full bg-gray-300 text-gray-700 text-xs font-extrabold flex items-center justify-center">2</span>
                  ) : posicion === 3 ? (
                    <span className="w-7 h-7 rounded-full bg-orange-400 text-orange-900 text-xs font-extrabold flex items-center justify-center">3</span>
                  ) : (
                    <span className="text-white/50 font-bold text-sm">#{posicion}</span>
                  )}
                </div>

                {/* Nombre */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-semibold truncate ${
                      esUsuarioActual ? 'text-[#f4862c]' : 'text-white'
                    }`}
                  >
                    {participante.nombre}
                    {esUsuarioActual && (
                      <span className="ml-2 text-xs font-normal text-[#f4862c]/70">(vos)</span>
                    )}
                  </p>
                </div>

                {/* Puntos */}
                <div className="shrink-0 text-right">
                  <span
                    className={`font-extrabold text-lg ${
                      esUsuarioActual ? 'text-[#f4862c]' : 'text-white'
                    }`}
                  >
                    {participante.puntos}
                  </span>
                  <span className="text-white/40 text-xs ml-1">pts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Si el usuario no está en el top 20, mostrar su posición real */}
        {!usuarioEnTop && posicionReal !== null && (
          <div className="w-full max-w-lg">
            <div className="flex items-center gap-2 text-white/30 text-xs mb-2 px-1">
              <span>···</span>
              <span>Tu posición</span>
              <span>···</span>
            </div>
            <div className="flex items-center gap-4 rounded-2xl px-5 py-3 bg-[#f4862c]/20 border-2 border-[#f4862c]">
              <div className="w-8 text-center shrink-0">
                <span className="text-white/50 font-bold text-sm">#{posicionReal}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate text-[#f4862c]">
                  {usuario.nombre}
                  <span className="ml-2 text-xs font-normal text-[#f4862c]/70">(vos)</span>
                </p>
              </div>
              <div className="shrink-0 text-right">
                <span className="font-extrabold text-lg text-[#f4862c]">{usuario.puntos}</span>
                <span className="text-white/40 text-xs ml-1">pts</span>
              </div>
            </div>
          </div>
        )}

        {/* Botón volver */}
        <Link
          href="/home"
          className="w-full max-w-lg block text-center border-2 border-white/30 text-white font-semibold rounded-2xl py-3 hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Volver a Home
        </Link>

      </div>
    </div>
  );
}
