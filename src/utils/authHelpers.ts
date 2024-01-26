import { JwtPayload, verify, sign, JsonWebTokenError } from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

export const generateVerificationToken = (email: string): string => {
  return sign({ email }, process.env.VERIFICATION_TOKEN_SECRET!, {
    expiresIn: '48h',
  });
};

export const verifyToken = (token: string): string | JwtPayload | undefined => {
  try {
    return verify(token, process.env.VERIFICATION_TOKEN_SECRET!) as JwtPayload;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      throw new Error(
        JSON.stringify({ name: error.name, message: error.message })
      );
    }
  }
};

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
