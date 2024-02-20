'use client';

import { Session } from 'next-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '@/services/mutations/auth.verifyEmail';
import { useEffect, useRef, useState } from 'react';

// TODO: Handle errors/success and routing

export default function VerifyEmail({ session }: { session: Session | null }) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const hasRun = useRef(false);
  const [mutationError] = useState(() => '');
  const router = useRouter();

  const { mutate: validateToken } = useMutation({
    mutationFn: verifyEmail,
    onSuccess() {
      router.push('/dashboard/account-pending');
    },
    onError(error) {
      console.error('~~~error from validateToken~~~', error);
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
