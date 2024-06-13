import { BASE_URL } from '@/shared/constants';

export type FetchService = {
  route: string;
  options?: {
    urlExtension?: string;
    config?: RequestInit;
  };
};

export function getUrl({ route, options }: FetchService) {
  const url = BASE_URL + '/api';

  if (options) {
    return url + route + options.urlExtension;
  }

  return url + route;
}

export const fetchHandler = async ({ route, options }: FetchService) => {
  try {
    const url = getUrl({ route, options });

    const response = await fetch(url, {
      ...options?.config,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('server error');
  }
};
