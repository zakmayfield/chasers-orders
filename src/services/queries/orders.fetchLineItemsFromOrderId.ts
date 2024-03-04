type FetchLineItemProducts = {
  (orderId: string): Promise<LineItemProducts>;
};

export type LineItemProducts = {
  id: string;
  lineItems: {
    id: string;
    quantity: number;
    unit: {
      id: string;
      product: {
        id: string;
        name: string;
        category: string;
      };
    };
  }[];
};

export const fetchLineItemsFromOrderId: FetchLineItemProducts = async (
  orderId
) => {
  try {
    const fetchUrl = new URL(
      `/api/orders/recent/line-items`,
      process.env.NEXT_PUBLIC_BASE_URL
    );
    const response = await fetch(fetchUrl, {
      headers: {
        'x-order-id': orderId,
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
