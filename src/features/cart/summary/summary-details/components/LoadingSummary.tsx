export const LoadingSummary = () => {
  return (
    <div className='flex flex-col gap-3'>
      {[1, 2].map((placeholder) => (
        <div
          key={placeholder}
          className='flex flex-col justify-center gap-1 h-[76px] border-slate-200 bg-slate-50 rounded-lg p-3 last-of-type:border-none'
        >
          <div className='flex gap-3 text-sm'>
            <span className='text-gray-500 bg-slate-100 h-3 w-6 rounded animate-pulse'></span>
            <span className='bg-slate-200 h-3 w-6 rounded animate-pulse'></span>
            <span className='text-gray-500 bg-slate-100 h-3 w-6 rounded animate-pulse'></span>
          </div>

          <span className='text-sm font-semibold w-full bg-slate-200 h-5 rounded animate-pulse'></span>
        </div>
      ))}
    </div>
  );
};
