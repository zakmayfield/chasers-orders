import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { Unit, RefinedCartItem } from '@/types';
import { Product as ProductWithoutUnits } from '@prisma/client';

async function handler(req: Request) {
  const session = await getAuthSession();

  // determine user auth
  if (!session?.user) {
    return new Response(
      JSON.stringify({ message: 'Unauthorized. Please log in to continue.' }),
      { status: 401 }
    );
  }

  // variables
  const userId = session.user.id;
  let unitIdArray: string[] = [];
  let unitsArray: Unit[] = [];
  let productIdArray: string[] = [];
  let productsArray: ProductWithoutUnits[] = [];
  let refinedCartData: RefinedCartItem[] = [];

  // retrieve cart record
  try {
    const cart = await db.cart.findUnique({
      where: { userId },
      include: { items: { select: { unitId: true, quantity: true } } },
    });

    if (!cart) {
      return new Response(JSON.stringify({ error: 'Could not locate cart' }), {
        status: 401,
      });
    }

    // iterate over cart.items and store ID's from cart/unit junction table
    if (cart.items) cart.items.forEach((item) => unitIdArray.push(item.unitId));

    // fetch units from array of ID's to access productID
    if (unitIdArray) {
      const unitsData = await db.unit.findMany({
        where: {
          id: {
            in: unitIdArray,
          },
        },
      });

      unitsArray = [...unitsData];
    }

    // fetch product via unit.productId
    if (unitsArray) {
      unitsArray.forEach((unit) => productIdArray.push(unit.productId));

      const products = await db.product.findMany({
        where: {
          id: {
            in: productIdArray,
          },
        },
      });

      productsArray = [...products];
    }

    // declare object maps for performance
    const unitMap = new Map(unitsArray.map((unit) => [unit.id, unit]));
    const productMap = new Map(
      productsArray.map((product) => [product.id, product])
    );

    // iterate and construct cart items to send back
    if (productsArray) {
      cart.items.forEach((item) => {
        let quantity: number;
        quantity = item.quantity;

        const mappedUnit = unitMap.get(item.unitId);
        let mappedProduct: ProductWithoutUnits | undefined;
        if (mappedUnit) mappedProduct = productMap.get(mappedUnit?.productId);

        let constructedItem: RefinedCartItem = {
          productId: mappedProduct!.id,
          unitId: mappedUnit!.id,
          productName: mappedProduct!.name,
          productCategory: mappedProduct!.category,
          unitSize: mappedUnit!.size,
          unitPrice: mappedUnit!.price,
          cartQuantity: quantity,
        };

        refinedCartData = [...refinedCartData, constructedItem];
      });
    }

    // send cart data back
    return new Response(JSON.stringify(refinedCartData), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: 'Server error', error: error.message }),
        {
          status: 500,
        }
      );
    }
  }
}

export { handler as GET };
