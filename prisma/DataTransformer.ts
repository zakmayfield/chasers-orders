import * as fs from 'fs';
import productData from './products-final.json';
import { categories as categoryData } from '@/utils/constants';

// Old
interface OldProduct {
  name: string;
  category: string;
  units: OldUnit[];
}

type OldUnit = {
  size: string;
  code: string;
  price: number;
};

function catGen() {
  const categories = productData.map((product) =>
    product.category.toLowerCase()
  );
  const cats = Array.from(new Set(categories));
  return { length: cats.length, cats };
}

const cats = catGen();

// New
type Category = {
  category_id: string;
  name: string;
  // products: Product[];
};

type Product = {
  product_id: string;
  category_id: string;
  name: string;
  // category: Category;
  // variants: ProductVariant[];
};

type ProductVariant = {
  product_variant_id: string;
  product_id: string;
  size_id: string;
  // product: Product;
  // variant: Variant;
};

type Variant = {
  size_id: string;
  product_variant_id: string;
  name: string;
  code: string;
  price: number;
  // product_variant: ProductVariant;
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
