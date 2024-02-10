import { verify, sign, JwtPayload } from 'jsonwebtoken';
import { JsonWebTokenError } from 'jsonwebtoken';

const secret = process.env.VERIFICATION_TOKEN_SECRET;

export const generateVerificationToken = (email: string): string => {
  const validSecret = getSecretOrThrow(secret);

  return sign({ email }, validSecret, {
    expiresIn: '48h',
  });
};

export const extractExpiration = (token: string): number => {
  const verifiedSecret = getSecretOrThrow(secret);

  try {
    const verified = verify(token, verifiedSecret);

    if (!isJwtPayload(verified)) {
      throw new Error('Invalid token format');
    }

    const { exp } = verified;

    if (typeof exp !== 'number') {
      throw new Error('Invalid expiration format');
    }

    return exp;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else if (
      error instanceof JsonWebTokenError &&
      error.name === 'JsonWebTokenError'
    ) {
      throw new Error(
        'There was a technical issue. Please visit the account creation page again and complete the account creation process again.'
      );
    } else {
      throw new Error('Error processing token');
    }
  }
};

function isJwtPayload(decoded: unknown): decoded is JwtPayload {
  return !!decoded && typeof decoded === 'object' && 'exp' in decoded;
}

function getSecretOrThrow(secret: string | undefined): string {
  if (!secret) {
    throw new Error('Verification token needs a secret');
  }

  return secret;
}
