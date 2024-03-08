import { DashboardUserData } from '@/types/types.dashboard';

type GetDashboardUserDataProps = {
  (): Promise<DashboardUserData>;
};

const devBaseUrl = process.env.DEV_BASE_URL;
const prodBaseUrl = process.env.PROD_BASE_URL;

export const getDashboardUser: GetDashboardUserDataProps = async () => {
  try {
    const fetchUrl = new URL(`/api/user`, process.env.NEXT_PUBLIC_BASE_URL);
    const response = await fetch(fetchUrl);

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
