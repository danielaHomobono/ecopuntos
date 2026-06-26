'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputField from '../components/InputField';
import Header from '../components/Header';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      router.push('/home');
    } catch (err) {
      setError('Error de conexión. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a2744] flex flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Banner superior con imagen de fondo */}
          <div className="relative h-44 overflow-hidden">
            <img
              src="/banner.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            {/* Overlay oscuro semi-transparente */}
            <div
              className="absolute inset-0 z-10"
              style={{ backgroundColor: 'rgba(26, 39, 68, 0.65)' }}
            />
            {/* Texto encima del overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-3xl font-bold text-white mb-1">Iniciar sesión</h1>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>Continuá cuidando el planeta</p>
            </div>
          </div>

          {/* Formulario */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f4862c] hover:bg-[#e07520] text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/registro"
                className="text-[#1a2744] hover:text-[#f4862c] font-medium transition-colors"
              >
                No tengo cuenta
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
