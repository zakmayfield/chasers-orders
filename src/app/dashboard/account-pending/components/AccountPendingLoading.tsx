'use client';
export const AccountPendingLoading = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='h-12 w-80 rounded animate-pulse bg-slate-200'></div>
      <div className='h-12 w-64 rounded animate-pulse bg-slate-100'></div>
    </div>
  );
};
