import GoBack from '@/features/GoBack';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams.error;

  return (
    <div>
      <div>Error Page</div>
      <div>{error && typeof error === 'string' && error}</div>
      <GoBack />
    </div>
  );
}
