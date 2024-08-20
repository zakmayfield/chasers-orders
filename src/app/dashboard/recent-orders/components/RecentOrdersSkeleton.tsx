export const RecentOrdersSkeleton = () => {
  return (
    <div className='w-4/5 flex flex-col gap-6'>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className={`
              h-10 rounded-lg animate-pulse 
              even:bg-light-secondary/80 
              odd:bg-light-tertiary/50 odd:mr-28 
            `}
        ></div>
      ))}
    </div>
  );
};
