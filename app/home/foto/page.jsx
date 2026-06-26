'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Camera, Leaf, ArrowLeft, ArrowRight, RefreshCw, Loader2, XCircle } from 'lucide-react';

export default function FotoPage() {
  const router = useRouter();
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analizando, setAnalizando] = useState(false);
  const [error, setError] = useState(null);

  function handleFoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    setArchivo(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  }

  function reintentar() {
    setArchivo(null);
    setPreview(null);
    setError(null);
  }

  async function handleContinuar() {
    if (!archivo) return;
    setAnalizando(true);
    setError(null);

    try {
      // Convertir archivo a base64 extrayendo también el MIME type real
      const { base64, mimeType } = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          const mime = dataUrl.split(';')[0].split(':')[1]; // ej: "image/jpeg"
          const datos = dataUrl.split(',')[1];
          resolve({ base64: datos, mimeType: mime });
        };
        reader.onerror = reject;
        reader.readAsDataURL(archivo);
      });

      const response = await fetch('/api/verificar-foto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagenBase64: base64, mimeType }),
      });

      const data = await response.json();

      if (data.valido) {
        router.push('/home?exito=true');
      } else {
        setError(data.razon || 'La imagen no fue validada.');
      }
    } catch {
      setError('Error de conexión. Intentá de nuevo.');
    } finally {
      setAnalizando(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#1a2744] flex flex-col items-center justify-center px-4 py-8 gap-6">

      {/* Encabezado */}
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-extrabold text-white inline-flex items-center gap-2">
          <Camera size={26} />
          Sacá una foto
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Fotografiá un residuo o acción ecológica para sumar puntos
        </p>
      </div>

      {/* Zona de cámara / preview */}
      <div className="w-full max-w-md">
        {preview ? (
          <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
            <img
              src={preview}
              alt="Preview de la foto"
              className="w-full object-cover max-h-72"
            />
            {/* Botón cambiar foto (solo si no está analizando) */}
            {!analizando && (
              <label
                htmlFor="input-foto"
                className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#1a2744] text-sm font-semibold px-3 py-1.5 rounded-xl shadow cursor-pointer hover:bg-white transition-colors inline-flex items-center gap-1.5"
              >
                <RefreshCw size={13} />
                Cambiar foto
              </label>
            )}
          </div>
        ) : (
          <label
            htmlFor="input-foto"
            className="flex flex-col items-center justify-center w-full h-56 rounded-2xl border-2 border-dashed border-white/30 bg-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors gap-3"
          >
            <Leaf size={48} className="text-[#4caf50]" />
            <span className="text-white/70 font-semibold text-sm">
              Tocá para abrir la cámara
            </span>
          </label>
        )}

        <input
          id="input-foto"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFoto}
          className="hidden"
          disabled={analizando}
        />
      </div>

      {/* Estado: analizando */}
      {analizando && (
        <div className="w-full max-w-md bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-center">
          <p className="text-white font-semibold text-base inline-flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            Analizando imagen...
          </p>
        </div>
      )}

      {/* Estado: error / rechazo de IA */}
      {error && !analizando && (
        <div className="w-full max-w-md bg-red-900/30 border border-red-400/40 rounded-2xl px-5 py-4">
          <p className="text-red-300 font-semibold text-sm inline-flex items-start gap-2">
            <XCircle size={18} className="mt-0.5 shrink-0" />
            {error}
          </p>
          <button
            onClick={reintentar}
            className="mt-3 w-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl py-2.5 transition-colors"
          >
            Intentar con otra foto
          </button>
        </div>
      )}

      {/* Botón Continuar (solo si hay foto y no está analizando ni hay error) */}
      {preview && !analizando && !error && (
        <button
          onClick={handleContinuar}
          className="w-full max-w-md bg-[#f4862c] hover:bg-[#e07520] active:scale-95 transition-all duration-200 text-white font-bold text-lg rounded-2xl py-5 shadow-lg inline-flex items-center justify-center gap-2"
        >
          Continuar
          <ArrowRight size={20} />
        </button>
      )}

      {/* Botón Volver */}
      {!analizando && (
        <Link
          href="/home"
          className="w-full max-w-md block text-center border-2 border-white/30 text-white font-semibold rounded-2xl py-3 hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Volver
        </Link>
      )}

    </div>
  );
}
