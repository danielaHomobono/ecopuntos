require('dotenv').config();
const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function verificar() {
  console.log('\n=== USUARIOS ===');
  const users = await client.execute('SELECT id, nombre, email, puntos, rol FROM User');
  console.table(users.rows);

  console.log('\n=== PREMIOS ===');
  const premios = await client.execute('SELECT * FROM Premio');
  console.table(premios.rows);

  console.log('\n✓ Conexión a Turso funcionando correctamente!');
}

verificar()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  });
