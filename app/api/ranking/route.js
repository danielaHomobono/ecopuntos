import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';

export async function GET() {
  const prisma = getPrisma();

  const ranking = await prisma.user.findMany({
    select: { id: true, nombre: true, puntos: true },
    orderBy: { puntos: 'desc' },
    take: 20,
  });

  return NextResponse.json(ranking);
}
