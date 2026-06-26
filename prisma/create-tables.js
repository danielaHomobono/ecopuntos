require('dotenv').config();
const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});

async function createTables() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      puntos INTEGER DEFAULT 0,
      rol TEXT DEFAULT 'user'
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS Accion (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      resultado INTEGER NOT NULL,
      razon TEXT NOT NULL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES User(id)
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS Premio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      costo INTEGER NOT NULL,
      stock INTEGER NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS Canje (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      premioId INTEGER NOT NULL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES User(id),
      FOREIGN KEY (premioId) REFERENCES Premio(id)
    )
  `);

  console.log('✓ Tablas creadas en Turso');
}

createTables()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
