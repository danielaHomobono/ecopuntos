import { NextResponse } from 'next/server';
import { getUsuarioActual } from '@/lib/getUsuarioActual';
import { getPrisma } from '@/lib/db';

export async function POST(request) {
  const usuario = await getUsuarioActual();

  if (!usuario) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { premioId } = await request.json();
  const prisma = getPrisma();

  const premio = await prisma.premio.findUnique({
    where: { id: premioId },
  });

  if (!premio) {
    return NextResponse.json({ error: 'Premio no encontrado' }, { status: 404 });
  }

  if (premio.stock <= 0) {
    return NextResponse.json({ error: 'Sin stock disponible' }, { status: 400 });
  }

  if (usuario.puntos < premio.costo) {
    return NextResponse.json({ error: 'No tenés suficientes puntos' }, { status: 400 });
  }

  const [usuarioActualizado] = await prisma.$transaction([
    prisma.user.update({
      where: { id: usuario.id },
      data: { puntos: { decrement: premio.costo } },
    }),
    prisma.premio.update({
      where: { id: premioId },
      data: { stock: { decrement: 1 } },
    }),
    prisma.canje.create({
      data: { userId: usuario.id, premioId },
    }),
  ]);

  return NextResponse.json({ exito: true, puntosRestantes: usuarioActualizado.puntos });
}
