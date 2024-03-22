'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='min-h-[35rem] flex items-center justify-center'>
      <div className='py-12 px-3 flex flex-col gap-6 max-w-md w-full '>
        <h1 className='text-2xl font-light'>Something went wrong!</h1>
        <div className='bg-light-primary rounded-lg px-3 py-12'>
          <p className='text-red-500'>
            {error && typeof error === 'string' && error}
          </p>
        </div>

        <button
          onClick={() => reset()}
          className='border p-2 rounded-lg w-36 mx-auto bg-light-greenish/70 text-white'
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
