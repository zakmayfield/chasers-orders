import SettingsNavbar from '@/features/dashboard/settings/nav/SettingsNavbar';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className='mb-6'>
        <h2 className='flex items-center mb-6'>
          Settings
          {/* {isLoading && <LoadingSpinner />} */}
        </h2>
        <SettingsNavbar />
      </div>

      <div>{children}</div>
    </div>
  );
}
