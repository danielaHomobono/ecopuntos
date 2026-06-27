'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="text-white/60 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 active:scale-95 transition-all duration-200"
    >
      <LogOut size={16} />
      <span>Cerrar sesión</span>
    </button>
  );
}
