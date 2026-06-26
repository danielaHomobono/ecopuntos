import { config } from 'dotenv';
config();
import { getPrisma } from '../lib/db.js';

const prisma = getPrisma();

await prisma.$transaction([
  prisma.premio.update({ where: { id: 1 }, data: { costo: 50 } }),
  prisma.premio.update({ where: { id: 2 }, data: { costo: 100 } }),
  prisma.premio.update({ where: { id: 3 }, data: { costo: 200 } }),
]);

const premios = await prisma.premio.findMany({ orderBy: { costo: 'asc' } });
premios.forEach(p => console.log(`id:${p.id} | ${p.nombre} | costo:${p.costo} | stock:${p.stock}`));

await prisma.$disconnect();
