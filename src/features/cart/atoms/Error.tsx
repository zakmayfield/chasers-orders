import { ContentWrapper, Text } from '@/shared/components/containers';
import { Icon } from '@/shared/components/ui';
import { WarningTriangleDuotone } from '@/shared/utils/ui';

export const Error = ({ message }: { message: string }) => {
  return (
    <ContentWrapper
      flex='row'
      rounded='sm'
      padding='sm'
      width='sm'
      className='bg-red-50'
    >
      <Icon
        IconData={WarningTriangleDuotone}
        iconClass='text-yellow-500 text-xl'
      />
      <Text>{message}</Text>
    </ContentWrapper>
  );
};
