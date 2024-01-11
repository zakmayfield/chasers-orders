import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Product } from '@/types';

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
        let formattedProducts = data.map((item) => {
          let formattedName = item.name.split('-').join(' ');
          return { ...item, name: formattedName };
        });

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
