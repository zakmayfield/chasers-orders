import { Btns, Containers, Headings, Icons, Loaders } from './components';

export default async function Page() {
  return (
    <div className='w-3/4 mx-auto flex flex-col gap-12'>
      {/* Headings */}
      <Headings />
      {/* Loaders */}
      <Loaders />
      {/* Containers */}
      <Containers />
      {/* Buttons */}
      <Btns />
      {/* Icons */}
      <Icons />
    </div>
  );
}
