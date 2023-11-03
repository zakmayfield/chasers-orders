import { PrismaClient } from '@prisma/client';
import products from './products.json';
const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        category: product.category,
        units: {
          create: product.units.map((unit: any) => ({
            size: unit.size,
            price: unit.price,
            code: unit.code,
          })),
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
