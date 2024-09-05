import { Btn, Container } from '@/shared/components/ui';
import { useChangePasswordForm } from '@/shared/hooks/utils';
import {
  EyeClosedDuotone,
  EyeDuotone,
  XCircleDuotone,
} from '@/shared/utils/ui';

export const ChangePasswordForm = () => {
  const {
    submit,
    register,
    cancel,
    canSeePassword,
    setCanSeePassword,
    formState,
  } = useChangePasswordForm();

  return (
    <form onSubmit={submit}>
      <Container as='div' flex='col' paddingX='lg'>
        <Container as='div' flex='col' className='lg:flex lg:flex-row'>
          <label className='max-w-xs w-full' htmlFor='old_password'>
            Old Password:
          </label>

          <Container
            as='div'
            flex='row'
            rounded='sm'
            className='bg-white border-2 pr-2 max-w-min'
          >
            <input
              {...register('old_password')}
              placeholder='old password'
              type={canSeePassword.old ? 'text' : 'password'}
              className='rounded-md px-2 py-1'
            />

            {canSeePassword.old ? (
              <EyeDuotone
                onClick={() =>
                  setCanSeePassword({ ...canSeePassword, old: false })
                }
                className='text-xl cursor-pointer'
              />
            ) : (
              <EyeClosedDuotone
                onClick={() =>
                  setCanSeePassword({ ...canSeePassword, old: true })
                }
                className='text-xl cursor-pointer'
              />
            )}
          </Container>
        </Container>

        <Container as='div' flex='col' className='lg:flex lg:flex-row'>
          <label className='max-w-xs w-full' htmlFor='old_password'>
            New Password:
          </label>

          <Container
            as='div'
            flex='row'
            rounded='sm'
            className='bg-white border-2 pr-2 max-w-min'
          >
            <input
              {...register('new_password')}
              placeholder='new password'
              type={canSeePassword.new ? 'text' : 'password'}
              className='rounded-md px-2 py-1'
            />

            {canSeePassword.new ? (
              <EyeDuotone
                onClick={() =>
                  setCanSeePassword({ ...canSeePassword, new: false })
                }
                className='text-xl cursor-pointer'
              />
            ) : (
              <EyeClosedDuotone
                onClick={() =>
                  setCanSeePassword({ ...canSeePassword, new: true })
                }
                className='text-xl cursor-pointer'
              />
            )}
          </Container>

          <Container as='div' flex='row'>
            <Btn
              type='submit'
              text='save'
              bgColor='green'
              height='sm'
              isDisabled={!formState.isValid}
            />

            {formState.isDirty && (
              <Btn Icon={XCircleDuotone} height='sm' handleClick={cancel} />
            )}
          </Container>
        </Container>
      </Container>
    </form>
  );
};
