import { redirect } from 'next/navigation';
import { getUsuarioActual } from '@/lib/getUsuarioActual';

export default async function RootPage() {
  const usuario = await getUsuarioActual();

  if (!usuario) {
    redirect('/login');
  }

  if (usuario.rol === 'admin') {
    redirect('/admin');
  } else {
    redirect('/home');
  }
}
