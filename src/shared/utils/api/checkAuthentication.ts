import { getAuthSession } from '@/lib/auth/auth.options';

export const checkAuthentication = async () => {
  const session = await getAuthSession();

  if (!session || !session.user) {
    throw new Error('Unauthenticated: Please log in to continue');
  }

  return { user_id: session.user.id, email: session.user.email };
};
