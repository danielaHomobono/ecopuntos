const { PrismaClient } = require('@prisma/client')

try {
  console.log('PrismaClient definido:', !!PrismaClient)
  console.log('Tipo:', typeof PrismaClient)
  
  const testClient = new PrismaClient()
  console.log('Cliente creado exitosamente:', !!testClient)
  
  testClient.$disconnect()
} catch (error) {
  console.error('Error creando PrismaClient:', error.message)
  console.error('Stack:', error.stack)
}
