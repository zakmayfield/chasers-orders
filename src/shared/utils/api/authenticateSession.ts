'use server';
import { getAuthSession } from '@/lib/auth/auth.options';

type TAuthenticateSession = () => Promise<TAuthenticateSessionData>;
type TAuthenticateSessionData =
  | {
      id: string;
      email: string;
    }
  | Response;

export const authenticateSession: TAuthenticateSession = async () => {
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
