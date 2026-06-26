'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function BotonCanjear({ premioId, costoPremio }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);

  async function handleCanjear() {
    setLoading(true);
    setExito(false);
    setError(null);

    try {
      const response = await fetch('/api/canjear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ premioId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al canjear');
      } else {
        setExito(true);
        router.refresh();
      }
    } catch {
      setError('Error de conexión. Intentá de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCanjear}
        disabled={loading || exito}
        className="w-full bg-[#f4862c] hover:bg-[#e07520] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all duration-200 text-white font-bold py-2.5 rounded-xl inline-flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Canjeando...
          </>
        ) : exito ? (
          <>
            <CheckCircle size={16} />
            ¡Premio canjeado!
          </>
        ) : (
          'Canjear'
        )}
      </button>

      {error && (
        <p className="text-red-400 text-xs font-medium inline-flex items-center gap-1">
          <XCircle size={13} />
          {error}
        </p>
      )}
    </div>
  );
}
