'use client';
import { useState } from 'react';

export default function UserAuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <button onClick={loginWithGoogle}>Google</button>
    </div>
  );
}
