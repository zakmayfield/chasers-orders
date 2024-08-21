import { Buttons, Containers, Headings, Loading, Logos } from './components';

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
      <Buttons />
      {/* Logos */}
      <Logos />
    </div>
  );
}
