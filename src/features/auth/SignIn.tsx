'use client';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import GridContainer from '../ui/layout/GridContainer';

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

  // TODO: NEED TO HANDLE LOG IN ERRORS

  return (
    <div className='border col-start-5 col-span-4 py-6 px-12 font-extralight'>
      <h2 className='font-light text-2xl mb-12'>Log In</h2>
      <form onSubmit={handleSubmit} className=''>
        <GridContainer cols={6}>
          <label htmlFor='email' className='col-span-6'>
            Email
          </label>

          <input
            type='email'
            id='email'
            value={email}
            className='border-2 rounded col-span-6 p-2 font-extralight text-lg '
            placeholder='email@example.com'
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='password' className='col-span-6 mt-6'>
            Password
          </label>

          <input
            type='password'
            id='password'
            value={password}
            className='border-2 rounded col-span-6 p-2 font-extralight text-lg'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type='submit'
            className='border-2 rounded-lg p-2 col-span-6 mt-6'
          >
            Sign In
          </button>
        </GridContainer>
      </form>

      <div className='text-center mt-12'>
        <p>
          Need to create an account?{' '}
          <Link href='/sign-up' className='underline'>
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
}
