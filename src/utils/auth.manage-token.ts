import { verify, sign, JwtPayload } from 'jsonwebtoken';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const generateVerificationToken = (email: string): string => {
  return sign({ email }, process.env.VERIFICATION_TOKEN_SECRET!, {
    expiresIn: '48h',
  });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const verified = verify(token, process.env.VERIFICATION_TOKEN_SECRET!);

    const isJwtPayload = (decoded: unknown): decoded is JwtPayload => {
      return !!decoded && typeof decoded === 'object' && 'exp' in decoded;
    };

    if (isJwtPayload(verified)) {
      return verified;
    } else {
      throw new Error('Object is not a JwtPayload');
    }
  } catch (error) {
    if (
      error instanceof JsonWebTokenError &&
      error.name === 'JsonWebTokenError'
    ) {
      throw new JsonWebTokenError(error.message, error);
    } else {
      throw new Error('Verify token error');
    }
  }
};
