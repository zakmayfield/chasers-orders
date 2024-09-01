export const getSearchParams = (
  searchParams: URLSearchParams,
  param: string
) => {
  const value = searchParams.get(param);
  if (!value) {
    return null;
  }
  return value;
};

export const getSearchParamsArray = (
  searchParams: URLSearchParams,
  params: string[]
) => {
  const values = params.map((param) => searchParams.get(param)) || [];
  return values;
};

export const getSearchParamsOrThrow = (
  searchParams: URLSearchParams,
  param: string
) => {
  const value = searchParams.get(param);
  if (!value) {
    throw new Error(`Invalid request: ${param} is required`);
  }
  return value;
};
