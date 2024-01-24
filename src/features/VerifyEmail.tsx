'use client';

import { Session } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { tokenCheck } from '@/store';
import { useEffect, useRef, useState } from 'react';

export default function VerifyEmail({ session }: { session: Session | null }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const hasRun = useRef(false);
  const [mutationError, setMutationError] = useState(() => '');
  const router = useRouter();

  // check validity / expiry via API route
  const {
    mutate: validateToken,
    error,
    isError,
  } = useMutation({
    mutationFn: tokenCheck,
    onSuccess(data, variables, context) {
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
