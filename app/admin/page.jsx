import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Shield, ShoppingBag, Coins, Gift, Trophy } from 'lucide-react';
import { getUsuarioActual } from '@/lib/getUsuarioActual';
import { getPrisma } from '@/lib/db';
import Header from '@/app/components/Header';

export default async function AdminPage() {
  const usuario = await getUsuarioActual();

  if (!usuario) {
    redirect('/login');
  }

  if (usuario.rol !== 'admin') {
    redirect('/home');
  }

  const prisma = getPrisma();

  const canjes = await prisma.canje.findMany({
    include: {
      user: {
        select: {
          nombre: true,
          email: true,
        },
      },
      premio: {
        select: {
          nombre: true,
          costo: true,
        },
      },
    },
    orderBy: {
      fecha: 'desc',
    },
  });

  const totalCanjes = canjes.length;
  const totalPuntos = canjes.reduce((sum, c) => sum + (c.premio?.costo || 0), 0);

  return (
    <div className="min-h-screen bg-[#1a2744] flex flex-col text-white">
      <Header showLogout={true} />

      <div className="flex-1 flex flex-col items-center px-4 py-8 gap-8 max-w-5xl w-full mx-auto">
        {/* Título de la página */}
        <div className="w-full text-center">
          <h1 className="text-3xl font-extrabold text-white inline-flex items-center gap-3">
            <Shield size={32} className="text-[#f4862c]" />
            Panel de Administración
          </h1>
          <p className="text-sm text-white/50 mt-2">Control de canjes y estadísticas del sistema</p>
        </div>

        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Card Total Canjes */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex items-center gap-5 border border-white/10">
            <div className="bg-[#f4862c]/20 p-4 rounded-xl text-[#f4862c]">
              <ShoppingBag size={28} />
            </div>
            <div>
              <p className="text-sm text-white/60 font-medium">Total de Canjes</p>
              <p className="text-3xl font-extrabold text-white mt-1">{totalCanjes}</p>
            </div>
          </div>

          {/* Card Total Puntos Canjeados */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg flex items-center gap-5 border border-white/10">
            <div className="bg-[#f4862c]/20 p-4 rounded-xl text-[#f4862c]">
              <Coins size={28} />
            </div>
            <div>
              <p className="text-sm text-white/60 font-medium">Total de Puntos Canjeados</p>
              <p className="text-3xl font-extrabold text-white mt-1">
                {totalPuntos} <span className="text-sm font-semibold text-white/60">pts</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabla de Canjes */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Historial de Canjes</h2>
          </div>

          <div className="overflow-x-auto w-full">
            {canjes.length === 0 ? (
              <div className="text-white/60 text-center py-12 px-4 font-medium">
                Todavía no hay canjes registrados
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-white/60 font-semibold text-xs uppercase tracking-wider">
                    <th className="px-6 py-4">Fecha</th>
                    <th className="px-6 py-4">Usuario</th>
                    <th className="px-6 py-4">Premio</th>
                    <th className="px-6 py-4 text-right">Costo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {canjes.map((canje) => {
                    const fechaFormateada = new Date(canje.fecha).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <tr key={canje.id} className="hover:bg-white/5 transition-colors text-sm">
                        <td className="px-6 py-4 whitespace-nowrap text-white/80">
                          {fechaFormateada}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{canje.user?.nombre}</div>
                          <div className="text-xs text-white/40">{canje.user?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-white/90">
                          {canje.premio?.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right font-extrabold text-[#f4862c]">
                          {canje.premio?.costo} <span className="text-xs font-normal text-white/40">pts</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Botones de Navegación del Administrador */}
        <div className="w-full max-w-md flex flex-col gap-3">
          <Link
            href="/premios"
            className="w-full block text-center border-2 border-white/30 hover:border-white/55 text-white font-semibold rounded-2xl py-3 hover:bg-white/10 active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-md"
          >
            <Gift size={18} />
            Ver Premios
          </Link>
          <Link
            href="/ranking"
            className="w-full block text-center border-2 border-white/30 hover:border-white/55 text-white font-semibold rounded-2xl py-3 hover:bg-white/10 active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-md"
          >
            <Trophy size={18} />
            Ver Ranking
          </Link>
        </div>
      </div>
    </div>
  );
}
