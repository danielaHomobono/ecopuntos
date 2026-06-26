import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/db'
import { verificarPassword, crearToken } from '@/lib/auth'

export async function POST(request) {
  try {
    const prisma = getPrisma()
    const { email, password } = await request.json()

    const usuario = await prisma.user.findUnique({
      where: { email }
    })

    if (!usuario) {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      )
    }

    const passwordValida = await verificarPassword(password, usuario.password)

    if (!passwordValida) {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      )
    }

    const token = crearToken(usuario)

    const response = NextResponse.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      puntos: usuario.puntos,
      rol: usuario.rol
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    })

    return response

  } catch (error) {
    console.error('ERROR LOGIN:', error)
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    )
  }
}