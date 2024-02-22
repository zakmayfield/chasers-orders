'use client';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import GridContainer from '../ui/layout/GridContainer';
import FormSwitchLink from './ui/FormSwitchLink';

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
      console.error(err);
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
            className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
            placeholder='geralt@rivia.com'
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='password' className='col-span-6'>
            Password
          </label>

          <input
            type='password'
            id='password'
            value={password}
            className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type='submit'
            className='border-2 rounded-lg p-2 col-span-6 focus:ring-4 focus:ring-blue-400 mt-6'
          >
            Sign In
          </button>
        </GridContainer>
      </form>

      <FormSwitchLink formType='sign-in' />
    </div>
  );
}
