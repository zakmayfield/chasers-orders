import { BASE_URL } from '@/shared/utils/constants';

export type FetchService = {
  route: string;
  options?: {
    urlExtension?: string;
    config?: RequestInit;
  };
};

export function getUrl({ route, options }: FetchService) {
  const url = BASE_URL + '/api';

  if (options?.urlExtension) {
    return url + route + options.urlExtension;
  }

  return url + route;
}

export const fetchHandler = async ({ route, options }: FetchService) => {
  try {
    const url = getUrl({ route, options });

    console.log('fetchHandler', { url });

    const optionsConfig: RequestInit = {
      headers: {
        'Content-type': 'application/json',
      },
      ...options?.config,
    };

    const response = await fetch(url, {
      ...optionsConfig,
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
