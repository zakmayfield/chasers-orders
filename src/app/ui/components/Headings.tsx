import { Heading } from '@/shared/components/ui';

export const Headings = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='border-b'>Headings</h1>

      <div className='flex flex-col gap-3'>
        <Heading as='h1' content='Title: h1' />
        <Heading as='h2' content='Title: h2' />
        <Heading as='h3' content='Title: h3' />
        <Heading as='h4' content='Title: h4' />
        <Heading as='h5' content='Title: h5' />
        <Heading as='h6' content='Title: h6' />
      </div>
    </div>
  );
};
