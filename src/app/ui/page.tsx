import { Btns, Containers, Headings, Loading, Logos } from './components';
import { Icons } from './components/Icons';

export default async function Page() {
  return (
    <div className='w-3/4 mx-auto flex flex-col gap-12'>
      {/* Headings */}
      <Headings />
      {/* Containers */}
      <Containers />
      {/* Loading */}
      <Loading />
      {/* Buttons */}
      <Btns />
      {/* Icons */}
      <Icons />
      {/* Logos */}
      <Logos />
    </div>
  );
}
