import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';


export async function POST(request) {
   
  try {
    const prisma = getPrisma();
    const { nombre, email, password } = await request.json();

    if (!nombre || !email || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    const usuarioExistente = await prisma.user.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const usuario = await prisma.user.create({
      data: {
        nombre,
        email,
        password: passwordHash,
        puntos: 0,
        rol: 'user'
      }
    });

    const { password: _, ...usuarioSinPassword } = usuario;

    return NextResponse.json(usuarioSinPassword, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 500 }
    );
  }
}
