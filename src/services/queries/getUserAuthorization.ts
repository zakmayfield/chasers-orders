import { BASE_URL } from '@/utils/constants';
import { JWT } from 'next-auth/jwt';

interface UserAuthorization {
  isApproved: boolean;
  emailVerified: Date | null;
}

export const getUserAuthorization = async (
  token: JWT
): Promise<UserAuthorization> => {
  if (token && (!token.isApproved || !token.emailVerified)) {
    const apiUrl = new URL(`/api/auth/user?userId=${token.id}`, BASE_URL);

    try {
      const response = await fetch(apiUrl);
      const { isApproved, emailVerified } = await response.json();

      return {
        isApproved,
        emailVerified,
      };
    } catch (error) {
      console.error(error);
    }
  }

  return {
    isApproved: token.isApproved,
    emailVerified: token.emailVerified,
  };
};
