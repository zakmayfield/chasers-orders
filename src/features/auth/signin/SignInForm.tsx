import { FC } from 'react';
import { signInWithCredentials, useSignInForm } from './helpers.signin';
import { SignInFormData } from '../types';
import FieldError from '../components/FieldError';

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm();

  function submitHandler(data: SignInFormData) {
    signInWithCredentials(data);
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className='grid grid-cols-6 gap-4'>
        <label htmlFor='email' className='col-span-6'>
          Email
        </label>

        <input
          type='email'
          id='email'
          {...register('email')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
          placeholder='geralt@rivia.com'
        />
        {errors.email && (
          <div className='col-span-6'>
            <FieldError message={errors.email.message} />
          </div>
        )}

        <label htmlFor='password' className='col-span-6'>
          Password
        </label>

        <input
          type='password'
          id='password'
          {...register('password')}
          className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
          placeholder='Password'
        />
        {errors.password && (
          <div className='col-span-6'>
            <FieldError message={errors.password.message} />
          </div>
        )}

        <button
          type='submit'
          className='border-2 rounded-lg p-2 col-span-6 focus:ring-4 focus:ring-blue-400 mt-6 bg-light-greenish/70 text-lg'
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignInForm;