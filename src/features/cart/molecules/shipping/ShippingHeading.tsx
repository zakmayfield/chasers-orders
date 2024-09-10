import { Heading } from '@/shared/components/ui';
import { useGetCompany } from '@/shared/hooks/data/user/useUser';
import { useSpinLoader } from '@/shared/components/loading';
import { ContentWrapper } from '@/shared/components/containers';
import { DownArrow } from '@/shared/utils/ui';

export const ShippingHeading = ({
  toggleOpen,
  isOpen,
}: {
  toggleOpen(): void;
  isOpen: boolean;
}) => {
  const { company, isLoading, error } = useGetCompany();
  const { SpinLoader } = useSpinLoader({});

  const canOpen = company && !error && !isLoading;
  const handleOpen = () => canOpen && toggleOpen();

  const loading = isLoading && <SpinLoader />;
  const dropDownArrow = company && !error && !isLoading && (
    <DownArrow
      onClick={handleOpen}
      className={`${!canOpen ? 'text-gray-300' : 'cursor-pointer'} ${isOpen && 'rotate-180'}`}
    />
  );

  return (
    <ContentWrapper flex='row' className='justify-between'>
      <Heading as='h5' content='Address' />

      {loading}
      {dropDownArrow}
    </ContentWrapper>
  );
};
