import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Gift, Star } from 'lucide-react';
import { getUsuarioActual } from '@/lib/getUsuarioActual';
import { getPrisma } from '@/lib/db';
import Header from '@/app/components/Header';
import BotonCanjear from './BotonCanjear';

export default async function PremiosPage() {
  const usuario = await getUsuarioActual();

  if (!usuario) {
    redirect('/login');
  }

  const prisma = getPrisma();

  const premios = await prisma.premio.findMany({
    orderBy: { costo: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#1a2744] flex flex-col">
      <Header />

      <div className="flex flex-col items-center px-4 py-8 gap-6">

        {/* Título y puntos del usuario */}
        <div className="w-full max-w-lg flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white inline-flex items-center gap-2">
              <Gift size={24} className="text-[#f4862c]" />
              Premios
            </h1>
            <p className="text-sm text-white/50 mt-0.5">Canjeá tus puntos por premios</p>
          </div>
          <div className="bg-[#f4862c] rounded-xl px-4 py-2 text-center shrink-0">
            <p className="text-2xl font-extrabold text-white">{usuario.puntos}</p>
            <p className="text-xs text-white/80">tus puntos</p>
          </div>
        </div>

        {/* Lista de premios */}
        {premios.length === 0 ? (
          <div className="w-full max-w-lg bg-white/10 rounded-2xl px-6 py-10 text-center">
            <p className="text-white/50 text-sm">No hay premios disponibles por el momento.</p>
          </div>
        ) : (
          <div className="w-full max-w-lg flex flex-col gap-4">
            {premios.map((premio) => {
              const sinStock = premio.stock <= 0;
              const puntosInsuficientes = usuario.puntos < premio.costo;

              return (
                <div
                  key={premio.id}
                  className={`rounded-2xl px-5 py-4 flex flex-col gap-3 border ${
                    sinStock
                      ? 'bg-white/5 border-white/10 opacity-60'
                      : 'bg-white/10 border-white/20'
                  }`}
                >
                  {/* Info del premio */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-base">{premio.nombre}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="inline-flex items-center gap-1 text-[#f4862c] font-semibold text-sm">
                          <Star size={13} />
                          {premio.costo} puntos
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            sinStock ? 'text-red-400' : 'text-[#4caf50]'
                          }`}
                        >
                          {sinStock ? 'Sin stock' : `Stock: ${premio.stock}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botón canjear */}
                  {sinStock ? (
                    <button
                      disabled
                      className="w-full bg-white/10 text-white/40 font-bold py-2.5 rounded-xl cursor-not-allowed text-sm"
                    >
                      Sin stock
                    </button>
                  ) : (
                    <BotonCanjear premioId={premio.id} costoPremio={premio.costo} />
                  )}
                </div>
              );
            })}
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
