import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function verificarPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export function crearToken(usuario) {
  const payload = {
    id: usuario.id,
    nombre: usuario.nombre,
    rol: usuario.rol
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export function verificarToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
