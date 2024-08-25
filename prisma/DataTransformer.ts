import * as fs from 'fs';
import productData from './products-final.json';
import { categories as categoryData } from '@/utils/constants';

type Product = {
  product_id: string;
  category_id: string;
  name: string;
  // category: Category;
  // sizes: ProductSize[];
};

type Category = {
  category_id: string;
  name: string;
};

type Size = {
  size_id: string;
  product_size_id: string;
  name: string;
  code: string;
  price: number;
  // productSize: ProductSize
};

type ProductSize = {
  product_size_id: string;
  product_id: string;
  size_id: string;
  // product: Product;
  // size: Size;
};

/* SEED
const prisma = new PrismaClient();

async function main() {
  try {
    for(const category of categoryData) {
      await prisma.category.create({
        data: {
          name: category
        }
      })
    }
    
    const categories = await prisma.category.findMany()

    for (const product of productData) {
      const category_id = categories.find(cat => cat.name === product.category.toLowerCase())?.id

      await prisma.product.create({
        data: {
         name: product.name,
         category_id,
         sizes: {
          create: product.units.map(unit => ({
            size: {
              create: {
                data: {
                  name: unit.size,
                  code: unit.code,
                  price: unit.price
                }
              }
            }
          }))
         }
        },
      });
    }
  } catch (error) {
    throw new Error(`Error seeding: ${error}`);
  }
}
*/
