import { config } from 'dotenv';
config(); // carga el .env antes de inicializar Prisma
import { getPrisma } from '../lib/db.js';

const prisma = getPrisma();

// Usuarios de prueba para el ranking
const usuariosPrueba = [
  { nombre: 'Ana García', email: 'ana@test.com', password: 'hash', puntos: 95, rol: 'user' },
  { nombre: 'Bruno López', email: 'bruno@test.com', password: 'hash', puntos: 80, rol: 'user' },
  { nombre: 'Carla Méndez', email: 'carla@test.com', password: 'hash', puntos: 70, rol: 'user' },
  { nombre: 'Diego Ruiz', email: 'diego@test.com', password: 'hash', puntos: 65, rol: 'user' },
  { nombre: 'Elena Torres', email: 'elena@test.com', password: 'hash', puntos: 55, rol: 'user' },
  { nombre: 'Facundo Gil', email: 'facundo@test.com', password: 'hash', puntos: 45, rol: 'user' },
  { nombre: 'Giuliana Paz', email: 'giuliana@test.com', password: 'hash', puntos: 40, rol: 'user' },
  { nombre: 'Hernán Silva', email: 'hernan@test.com', password: 'hash', puntos: 30, rol: 'user' },
];

for (const u of usuariosPrueba) {
  await prisma.user.upsert({
    where: { email: u.email },
    update: { puntos: u.puntos },
    create: u,
  });
}

await prisma.$disconnect();
