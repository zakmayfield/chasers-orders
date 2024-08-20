export const TableLoading = () => {
  return (
    <div className='pt-1 h-[546px]'>
      <div className='h-[105px] flex items-center gap-6 animate-pulse'>
        <div className='h-3/4 rounded-lg w-1/2 bg-slate-200'></div>
        <div className='h-3/4 rounded-lg w-1/4 bg-slate-200'></div>
        <div className='h-3/4 rounded-lg w-1/4 bg-slate-200'></div>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
        return (
          <div
            key={item}
            className='h-[45px] rounded mx-auto odd:bg-slate-100 animate-pulse'
          ></div>
        );
      })}
    </div>
  );
};
