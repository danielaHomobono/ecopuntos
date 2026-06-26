'use client';

import { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function BannerExito() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full max-w-md bg-[#4caf50]/20 border border-[#4caf50]/50 rounded-2xl px-5 py-4 flex items-center justify-between gap-3">
      <p className="text-[#4caf50] font-semibold text-sm inline-flex items-center gap-2">
        <CheckCircle size={18} className="shrink-0" />
        ¡Gracias por ayudar a nuestro planeta! (+10 puntos)
      </p>
      <button
        onClick={() => setVisible(false)}
        className="text-[#4caf50]/70 hover:text-[#4caf50] transition-colors shrink-0"
        aria-label="Cerrar"
      >
        <X size={16} />
      </button>
    </div>
  );
}
