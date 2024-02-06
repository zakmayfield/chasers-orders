'use client';

import { Session } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { tokenValidator } from '@/store/auth/auth.email.token-validator';
import { useEffect, useRef, useState } from 'react';

// TODO: Handle errors/success and routing

export default function VerifyEmail({ session }: { session: Session | null }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const hasRun = useRef(false);
  const [mutationError, setMutationError] = useState(() => '');
  const router = useRouter();

  const {
    mutate: validateToken,
    error,
    isError,
  } = useMutation({
    mutationFn: tokenValidator,
    onSuccess(data) {
      console.log('~~~data from validateToken~~~', data);
      router.push('/dashboard');
    },
    onError(error) {
      console.log('~~~error from validateToken~~~', error);
    },
  });

  useEffect(() => {
    if (!hasRun.current) {
      validateToken(token);
      hasRun.current = true;
    }
  }, [token, validateToken]);

  return (
    <div>
      <div>Hello, {session?.user.email}</div>
      <div>Verification Token: {token && <span>{token}</span>}</div>
      <div>{mutationError}</div>
    </div>
  );
}
