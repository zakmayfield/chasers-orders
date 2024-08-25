import Link from 'next/link';
import notfound from '@/assets/notfound.png';
import Image from 'next/image';
import { Heading } from '@/shared/components/ui';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center 2xl:flex-row 2xl:justify-center 2xl:items-end'>
      <NotFoundImage />
      <NotFoundInfo />
    </div>
  );
}

function NotFoundImage() {
  return (
    <div className=''>
      <Image
        src={notfound}
        alt='illustration of a person riding a rocket away from the not found text'
        width={400}
        aria-describedby='png image from pngtree.com'
        priority
      />
    </div>
  );
}

function NotFoundInfo() {
  return (
    <div className='flex items-end'>
      <div className='2xl:py-12'>
        <Heading as='h1' content='Not Found' />
        <p className='mb-6 text-lg'>
          We couldn&apos;t find that requested resource
        </p>
        <Link
          href='/dashboard'
          className='underline text-light-green-500 text-xl 2xl:lg'
        >
          Head back home
        </Link>
      </div>
    </div>
  );
}
