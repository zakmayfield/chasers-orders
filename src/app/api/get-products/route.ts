import { NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Product } from '@/types';

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const products: Product[] = await db.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        units: true,
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'could not find products' },
      { status: 500 }
    );
  }
}
