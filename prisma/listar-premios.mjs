import { config } from 'dotenv';
config();
import { getPrisma } from '../lib/db.js';

const prisma = getPrisma();
const premios = await prisma.premio.findMany({ orderBy: { costo: 'asc' } });
premios.forEach(p => console.log(`id:${p.id} | ${p.nombre} | costo:${p.costo} | stock:${p.stock}`));
await prisma.$disconnect();
