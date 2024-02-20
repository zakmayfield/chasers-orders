import { GetShippingPayload } from '@/app/api/user/company/shipping/route';

export const getShipping = async (): Promise<
  GetShippingPayload | undefined
> => {
  try {
    const response = await fetch('/api/user/company/shipping');

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
