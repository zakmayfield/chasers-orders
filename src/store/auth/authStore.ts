export const tokenCheck = async (
  token: string | null
): Promise<Response | undefined> => {
  const data = await fetch('/api/auth/email/verify', {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })
    .then((res) => {
      if (!res.ok) {
        return res;
      }
      return res.json();
    })
    .catch((error) => error);

  return data;
};
