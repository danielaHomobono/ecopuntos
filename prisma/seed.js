require('dotenv').config();
const bcrypt = require('bcryptjs');
const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function main() {
  const hashedPassword = await bcrypt.hash('pepeloco', 10);

  await client.execute({
    sql: 'INSERT INTO User (nombre, email, password, puntos, rol) VALUES (?, ?, ?, ?, ?)',
    args: ['Agus', 'agus@ecopuntos.com', hashedPassword, 0, 'admin']
  });

  await client.execute({
    sql: 'INSERT INTO Premio (nombre, costo, stock) VALUES (?, ?, ?)',
    args: ['Premio 1', 50, 5]
  });

  await client.execute({
    sql: 'INSERT INTO Premio (nombre, costo, stock) VALUES (?, ?, ?)',
    args: ['Premio 2', 100, 5]
  });

  await client.execute({
    sql: 'INSERT INTO Premio (nombre, costo, stock) VALUES (?, ?, ?)',
    args: ['Premio 3', 200, 5]
  });

  console.log('✓ Seed completado: usuario admin y 3 premios creados');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
