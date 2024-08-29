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
