import { signIn } from 'next-auth/react';
import { verify, sign, JwtPayload, JsonWebTokenError } from 'jsonwebtoken';
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { NEXTAUTH_SECRET } from '@/shared/utils/constants';
import { SignInFormData, SignUpFormData } from '@/shared/types/Forms';
import { TProductWithVariants } from '@/shared/types/Product';

//^ AUTH
export const handleSignIn = async (data: SignInFormData) =>
  await signIn('sign-in', {
    ...data,
  });

export const handleSignUp = async (data: SignUpFormData) => {
  try {
    await signIn('sign-up', {
      ...data,
    });

    return {
      isSuccess: true,
    };
  } catch (err) {
    return {
      isSuccess: false,
    };
  }
};

//^ PRODUCT TABLE
export const getColumnHelper = () => createColumnHelper<TProductWithVariants>();

export const useTableConstructor = (
  data: TProductWithVariants[] | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TProductWithVariants, any>[]
) => {
  const options = {
    enableFilters: true,
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  };

  const tableConfig = useReactTable({
    data: data ? data : [],
    columns,
    ...options,
  });

  return { tableConfig };
};

//^ TOKEN
function getSecretOrThrow(secret: string | undefined): string {
  if (!secret) {
    throw new Error('Verification token needs a secret');
  }

  return secret;
}

function isJwtPayload(decoded: unknown): decoded is JwtPayload {
  return !!decoded && typeof decoded === 'object' && 'exp' in decoded;
}

export const generateVerificationToken = (email: string): string => {
  const validSecret = getSecretOrThrow(NEXTAUTH_SECRET);

  return sign({ email }, validSecret, {
    expiresIn: '48h',
  });
};

export const extractExpiration = (token: string): number => {
  const verifiedSecret = getSecretOrThrow(NEXTAUTH_SECRET);

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
