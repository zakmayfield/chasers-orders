'use client';

import { Session } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { tokenValidator } from '@/store/auth.email.token-validator';
import { useEffect, useRef, useState } from 'react';

export default function VerifyEmail({ session }: { session: Session | null }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const hasRun = useRef(false);
  const [mutationError, setMutationError] = useState(() => '');
  const router = useRouter();

  // When user is redirected here, validate token
  const {
    mutate: validateToken,
    error,
    isError,
  } = useMutation({
    mutationFn: tokenValidator,
    // TODO: fix the error handling to allow for onError: @/store/auth.token-validator
    onSuccess(data) {
      if (data && 'ok' in data) {
        setMutationError(data.statusText);
      } else {
        router.push('/foo');
      }
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
