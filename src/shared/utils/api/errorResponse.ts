export const errorResponse = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes('Unauthenticated')) {
      return new Response(error.message, { status: 401 });
    }

    return new Response(error.message, { status: 500 });
  }
  return new Response('Server error', { status: 500 });
};
