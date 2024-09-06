import { merge } from '@/shared/utils/ui';

const BaseLoader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={merge(`p-3 px-6 bg-slate-100 rounded-md ${className}`)}>
      {children}
    </div>
  );
};

type LoaderProps = {
  width?: 'full';
};
const Sm = (props: LoaderProps) => {
  const { width } = props;
  const widthClass = width ? width : 'max-w-sm';
  return (
    <BaseLoader className={widthClass}>
      <div className='flex gap-3'>
        <div className='p-3 bg-slate-200 rounded-[3rem] animate-pulse'></div>
        <div className='p-3 bg-slate-200 rounded-[3rem] w-full animate-pulse'></div>
      </div>
    </BaseLoader>
  );
};
const Md = (props: LoaderProps) => {
  const { width } = props;
  const widthClass = width ? width : 'max-w-lg';
  return (
    <BaseLoader className={widthClass}>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-3'>
          <div className='p-3 bg-slate-200 rounded-[3rem] animate-pulse w-1/3'></div>
          <div className='p-3 bg-slate-200 rounded-[3rem] animate-pulse w-full'></div>
        </div>

        <div className='flex gap-3'>
          <div className='p-6 bg-slate-200 rounded-[3rem] animate-pulse w-2/3'></div>
          <div className='p-6 bg-slate-200 rounded-[3rem] animate-pulse w-1/3'></div>
        </div>
      </div>
    </BaseLoader>
  );
};
const Lg = (props: LoaderProps) => {
  const { width } = props;
  const widthClass = width ? width : 'max-w-2xl';
  return (
    <BaseLoader className={widthClass}>
      <div className='flex flex-col gap-3'>
        <div className='flex gap-3'>
          <div className='p-6 bg-slate-200 rounded-[3rem] animate-pulse w-1/3'></div>
          <div className='p-6 bg-slate-200 rounded-[3rem] animate-pulse w-full'></div>
        </div>

        <div className='flex gap-3'>
          <div className='p-24 bg-slate-200 rounded-[3rem] animate-pulse w-4/5'></div>

          <div className='flex flex-col gap-3 w-1/5'>
            <div className='p-6 bg-slate-200 rounded-[3rem] animate-pulse w-full'></div>
            <div className='bg-slate-200 rounded-[3rem] animate-pulse w-full h-full'></div>
          </div>
        </div>

        <div className='flex gap-3'>
          <div className='p-12 bg-slate-200 rounded-[3rem] animate-pulse w-full'></div>
          <div className='p-12 bg-slate-200 rounded-[3rem] animate-pulse w-full'></div>
        </div>
      </div>
    </BaseLoader>
  );
};

type PulseLoaderProps = LoaderProps & {
  size: 'sm' | 'md' | 'lg';
};
export const PulseLoader = (props: PulseLoaderProps) => {
  const { size, ...rest } = props;

  switch (size) {
    case 'sm':
      return <Sm {...rest} />;
    case 'md':
      return <Md {...rest} />;
    case 'lg':
      return <Lg {...rest} />;
  }
};
