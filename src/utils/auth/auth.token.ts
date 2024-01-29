import { verify, sign, JsonWebTokenError, JwtPayload } from 'jsonwebtoken';

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
