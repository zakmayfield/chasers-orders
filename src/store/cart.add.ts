export const addToCart = async (
  unitId: string
): Promise<Response | undefined> => {
  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(unitId),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
