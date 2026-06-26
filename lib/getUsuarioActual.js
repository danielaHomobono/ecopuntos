import { cookies } from 'next/headers';
import { verificarToken } from './auth';

export async function getUsuarioActual() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return null;
  }
  
  return verificarToken(token);
}
