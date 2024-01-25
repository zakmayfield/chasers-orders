'use client';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const credLogin = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await signIn('sign-in', {
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn('google', undefined, {
        prompt: 'select_account',
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await credLogin(email, password);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email:</label>

        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='password'>Password:</label>

        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Sign In</button>
      </form>

      <Link href='/sign-up'>Go to Sign Up</Link>
      {/* <p>OR</p> */}
      {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
    </div>
  );
}
