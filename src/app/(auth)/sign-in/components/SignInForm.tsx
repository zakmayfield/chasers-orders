'use client';
import FieldError from '@/app/(auth)/components/FieldError';
import { SignInButton } from '.';
import { handleSignIn } from '@/shared/utils/helpers';
import { useCustomForm } from '@/shared/hooks/custom';
import { signInResolver } from '@/shared/validators/resolvers';
import { SignInFormData } from '@/shared/types/Forms';
import { Container } from '@/shared/components/ui';

const defaultSignInFormValues = {
  email: '',
  password: '',
};

export const SignInForm = ({}) => {
  const {
    methods: {
      register,
      handleSubmit,
      formState: { errors, isSubmitted, isSubmitSuccessful },
    },
  } = useCustomForm<SignInFormData>({
    defaultValues: defaultSignInFormValues,
    resolver: signInResolver,
  });

  function submitHandler(data: SignInFormData) {
    handleSignIn(data);
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

        <Container as='div' className='col-span-full'>
          <SignInButton
            isSubmitted={isSubmitted}
            isSubmitSuccessful={isSubmitSuccessful}
          />
        </Container>
      </div>
    </form>
  );
};
