import { JWT } from 'next-auth/jwt';

interface IUserVerification {
  isApproved: boolean;
  emailVerified: Date | null;
}

type ResolvedVerificationCheck = {
  (token: JWT | null): Promise<IUserVerification>;
};

export const verifyApprovalAndEmail: ResolvedVerificationCheck = async (
  token
) => {
  if (token && (!token.isApproved || !token.emailVerified)) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = new URL(`/api/auth/user?userId=${token.id}`, baseURL);

    try {
      const response = await fetch(apiUrl);
      const { isApproved, emailVerified } = await response.json();
      return { isApproved, emailVerified };
    } catch (error) {
      console.log(error);
    }
  }

  return { isApproved: token!.isApproved, emailVerified: token!.emailVerified };
};
