import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function deleteAllProducts() {
  try {
    console.log('delete all products::running');
    await prisma.product.deleteMany({});
  } catch (error) {
    console.log('delete all products::error');
    throw new Error(`Error deleting products: ${error}`);
  }
}

deleteAllProducts()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
