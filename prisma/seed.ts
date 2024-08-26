import { PrismaClient } from '@prisma/client';
import productData from './data/products-final.json';
import { categories as categoryData } from '../src/utils/constants';

const prisma = new PrismaClient();

async function main() {
  try {
    for (const category of categoryData) {
      await prisma.category.create({
        data: {
          name: category,
        },
      });
    }

    const categories = await prisma.category.findMany();

    for (const product of productData) {
      const category_id = categories.find(
        (cat) => cat.name === product.category.toLowerCase()
      )?.category_id!;

      await prisma.product.create({
        data: {
          name: product.name.split('-').join(' '),
          category_id,
          variants: {
            create: product.units.map((unit) => ({
              size: unit.size,
              code: unit.code,
              price: unit.price,
            })),
          },
        },
      });
    }
  } catch (error) {
    throw new Error(`Error seeding: ${error}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
