import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/prisma.db';
import { Product } from '@/features/products/Products';

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const products: Product[] = await db.product
      .findMany({
        select: {
          id: true,
          name: true,
          category: true,
          units: true,
        },
      })
      .then((data) => {
        let formattedProducts: Product[] = data.map((item) => ({
          ...item,
          name: item.name.replace(/-/g, ' '),
        }));

        return formattedProducts;
      });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'could not find products' }),
      { status: 500 }
    );
  }
}
