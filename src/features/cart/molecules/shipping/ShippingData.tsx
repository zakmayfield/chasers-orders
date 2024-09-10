import { ContentWrapper, Text } from '@/shared/components/containers';
import { Heading } from '@/shared/components/ui';
import { TCompanyWithAddress } from '@/shared/types/User';

export const ShippingData = ({ company }: { company: TCompanyWithAddress }) => {
  const { name, shipping } = company;

  return (
    <ContentWrapper
      flex='col'
      rounded='lg'
      padding='md'
      className='items-start bg-slate-100'
    >
      <Heading as='h6' content={name} />

      <ContentWrapper flex='col' gap='sm'>
        <Text>{shipping?.streetAddress}</Text>

        <ContentWrapper flex='row' gap='sm'>
          <Text>{shipping?.city},</Text>
          <Text>{shipping?.state}</Text>
        </ContentWrapper>

        <Text>{shipping?.postalCode}</Text>
      </ContentWrapper>
    </ContentWrapper>
  );
};
