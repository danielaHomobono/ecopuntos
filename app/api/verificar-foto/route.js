import { NextResponse } from 'next/server';
import { getUsuarioActual } from '@/lib/getUsuarioActual';
import { getPrisma } from '@/lib/db';
import { verificarFotoConIA } from '@/lib/verificarFotoConIA';

export async function POST(request) {
  const usuario = await getUsuarioActual();

  if (!usuario) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { imagenBase64, mimeType } = await request.json();

  const { valido, razon } = await verificarFotoConIA(imagenBase64, mimeType);

  const prisma = getPrisma();

  await prisma.accion.create({
    data: {
      userId: usuario.id,
      resultado: valido,
      razon,
      fecha: new Date(),
    },
  });

  if (valido) {
    const usuarioActualizado = await prisma.user.update({
      where: { id: usuario.id },
      data: { puntos: { increment: 10 } },
    });

    return NextResponse.json({
      valido: true,
      razon,
      puntosNuevos: usuarioActualizado.puntos,
    });
  }

  return NextResponse.json({ valido: false, razon });
}
