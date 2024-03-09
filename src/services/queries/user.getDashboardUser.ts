import { DashboardUserData } from '@/types/types.dashboard';

type GetDashboardUserDataProps = {
  (): Promise<DashboardUserData>;
};

// TODO: testing with line 10-16
export const getDashboardUser: GetDashboardUserDataProps = async () => {
  try {
    const envURL =
      process.env.VERCEL_ENV === 'development'
        ? process.env.NEXT_PUBLIC_DEV_BASE_URL
        : process.env.NEXT_PUBLIC_BASE_URL;

    const fetchUrl = new URL(`/api/user`, envURL);
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
