import { PrismaClient } from '@prisma/client';
import products from './products-final.json';
const prisma = new PrismaClient();

// async function main() {
//   try {
//     for (const product of products) {
//       await prisma.product.create({
//         data: {
//           name: product.name,
//           category: product.category,
//           units: {
//             create: product.units.map((unit: any) => ({
//               size: unit.size,
//               price: unit.price,
//               code: unit.code,
//             })),
//           },
//         },
//       });
//     }
//   } catch (error) {
//     throw new Error(`Error seeding: ${error}`);
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
