type TokenValidatorReturn = {
  (token: string | null): Promise<Response | undefined>;
};

export const tokenValidator: TokenValidatorReturn = async (
  token
): Promise<Response | undefined> => {
  try {
    const response = await fetch('/api/auth/email/verify', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token }),
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
