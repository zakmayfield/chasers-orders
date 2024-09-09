import { Container } from '@/shared/components/ui';
import { DownArrow } from '@/shared/utils/ui';

export const ShippingDropDownArrow = ({
  handleOpen,
  canOpen,
  isOpen,
}: {
  handleOpen: () => false | void | undefined;
  canOpen: boolean | undefined;
  isOpen: boolean;
}) => {
  return (
    <Container as='div'>
      <DownArrow
        onClick={handleOpen}
        className={`${!canOpen ? 'text-gray-300' : 'cursor-pointer'} ${isOpen && 'rotate-180'}`}
      />
    </Container>
  );
};
