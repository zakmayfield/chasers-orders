import { Container } from '@/shared/components/ui';
import { AccordionContext } from '@/shared/hooks/utils';
import { TOrderWithLineItems } from '@/shared/types/Order';
import { OrdersItemHeader } from '../atoms/OrdersItemHeader';
import { OrdersItemBody } from '../atoms/OrdersItemBody';

export const OrdersItem = ({
  order,
  accordionCtx,
}: {
  order: TOrderWithLineItems;
  accordionCtx: AccordionContext;
}) => {
  const created_at = new Date(order.created_at).toDateString();
  return (
    <Container
      as='div'
      flex='col'
      rounded='sm'
      padding='lg'
      className='bg-slate-100 min-w-min'
    >
      <OrdersItemHeader
        order_id={order.order_id}
        created_at={created_at}
        accordionCtx={{ ...accordionCtx }}
      />

      <OrdersItemBody
        order_id={order.order_id}
        line_items={order.line_items}
        accordionCtx={{ ...accordionCtx }}
      />
    </Container>
  );
};
