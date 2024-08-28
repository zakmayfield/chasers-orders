export const getSearchParams = (
  searchParams: URLSearchParams,
  param: string
) => {
  const value = searchParams.get(param);
  if (!value) {
    throw new Error(`Invalid request: ${param} is required`);
  }
  return value;
};
