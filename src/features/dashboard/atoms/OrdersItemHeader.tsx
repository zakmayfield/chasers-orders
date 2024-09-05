import { Btn, Container, Heading } from '@/shared/components/ui';
import { AccordionContext } from '@/shared/hooks/utils';
import { DownArrow } from '@/shared/utils/ui';

export const OrdersItemHeader = ({
  order_id,
  created_at,
  accordionCtx: { isExpanded, handleExpand },
}: {
  order_id: string;
  created_at: string;
  accordionCtx: AccordionContext;
}) => {
  return (
    <Container as='div' flex='row' className='items-start justify-between'>
      <Container as='div' className='lg:flex lg:flex-row lg:gap-3 lg:items-end'>
        <Heading as='h3' content={created_at} />

        <Container as='div' flex='row'>
          <Container as='p' className='text-sm md:text-base'>
            Order ID:
          </Container>
          <Container
            as='p'
            className='italic text-gray-600 text-sm md:text-base'
          >
            {order_id}
          </Container>
        </Container>
      </Container>

      <Btn
        Icon={DownArrow}
        height='sm'
        bgColor='green'
        className={`${isExpanded(order_id) ? 'rotate-180' : ''}`}
        handleClick={() => handleExpand(order_id)}
      />
    </Container>
  );
};
