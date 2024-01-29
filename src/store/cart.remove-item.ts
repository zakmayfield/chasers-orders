export const removeCartItem = async ({
  unitId,
  cartId,
}: {
  unitId: string;
  cartId: string;
}): Promise<Response> => {
  const data = await fetch('/api/cart/remove', {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ unitId, cartId }),
  })
    .then((res) => res.json())
    .catch((err) => err);

  return data;
};
