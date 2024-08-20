import { BackButton } from '@/shared/components/buttons';
import { Heading } from '@/shared/components/ui';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams.error;

  return (
    <div className='min-h-[35rem] flex items-center justify-center'>
      <div className='py-12 px-3 flex flex-col gap-6 max-w-md w-full '>
        <Heading as='h1' content='Error:' className='text-2xl font-light' />
        <div className='bg-light-primary rounded-lg px-3 py-12'>
          <p className='text-red-500'>
            {error && typeof error === 'string' && error}
          </p>
        </div>

        <BackButton className='mx-auto' />
      </div>
    </div>
  );
}
