import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';
import { ProductWithUnits } from '@/types/products';

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const products: ProductWithUnits[] = await db.product
      .findMany({
        select: {
          id: true,
          name: true,
          category: true,
          units: true,
        },
      })
      .then((data) => {
        const formattedProducts: ProductWithUnits[] = data.map((item) => ({
          ...item,
          name: item.name.replace(/-/g, ' '),
        }));

        return formattedProducts;
      });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
  }
}
