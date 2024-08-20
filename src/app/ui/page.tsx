import { Buttons, Headings, Loading } from './components';

export default async function Page() {
  return (
    <div className='w-3/4 mx-auto flex flex-col gap-12'>
      {/* Headings */}
      <Headings />
      {/* Loading */}
      <Loading />
      {/* Buttons */}
      <Buttons />
    </div>
  );
}
