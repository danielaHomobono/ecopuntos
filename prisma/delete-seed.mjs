import { config } from 'dotenv';
config();
import { getPrisma } from '../lib/db.js';

const prisma = getPrisma();

const emails = [
  'ana@test.com',
  'bruno@test.com',
  'carla@test.com',
  'diego@test.com',
  'elena@test.com',
  'facundo@test.com',
  'giuliana@test.com',
  'hernan@test.com',
];

const resultado = await prisma.user.deleteMany({
  where: { email: { in: emails } },
});

await prisma.$disconnect();
