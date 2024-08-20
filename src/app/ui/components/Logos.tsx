import { LogoBase, LogoSm } from '@/shared/components/ui';

export const Logos = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='border-b'>Logos</h1>

      <div className='flex gap-3'>
        <LogoBase />
        <LogoSm />
      </div>
    </div>
  );
};
