'use server';

import { getAuthSession } from '@/lib/auth/auth.options';

// ^ Session

interface IAuthenticateSession {
  (): Promise<AuthenticateSessionReturn | Response>;
}

type AuthenticateSessionReturn = {
  id: string;
  email: string;
};

export const authenticateSession: IAuthenticateSession = async () => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new Response('Unauthorized: Please log in to continue.', {
      status: 401,
    });
  }

  const { id, email } = session.user;

  return {
    id,
    email: email!,
  };
};
