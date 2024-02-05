import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function deleteAllProducts() {
  try {
    await prisma.product.deleteMany({});
  } catch (error) {
    throw new Error(`Error deleting products: ${error}`);
  } finally {
    await prisma.$disconnect();
    process.exit(1);
  }
}

deleteAllProducts();
