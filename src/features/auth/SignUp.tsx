'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UserAuthFormData } from '@/types/authTypes';
import { UserAuthValidator } from '@/lib/validators/user-auth';

export default function SignUp() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
  } = useForm<UserAuthFormData>({
    resolver: zodResolver(UserAuthValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const credentialSignUp = async (data: UserAuthFormData) => {
    const { email, password } = data;
    try {
      await signIn('sign-up', {
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(credentialSignUp)}>
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' {...register('email')} />

        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' {...register('password')} />

        <button type='submit'>Sign Up</button>

        {errors.email && <p role='alert'>{errors.email?.message}</p>}
        {errors.password && <p role='alert'>{errors.password?.message}</p>}
      </form>

      <Link href='/sign-in'>Go to Sign In</Link>
    </div>
  );
}
