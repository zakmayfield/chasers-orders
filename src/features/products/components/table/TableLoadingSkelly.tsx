export const TableLoadingSkeleton = () => {
  return (
    <div className='mt-24 pt-1'>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
        return (
          <div
            key={item}
            className='h-[45px] w-3/4 mx-auto even:bg-gray-100 animate-pulse'
          ></div>
        );
      })}
    </div>
  );
};
