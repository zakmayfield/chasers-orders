import { Container, Heading } from '@/shared/components/ui';
import { TOrderWithLineItems } from '@/shared/types/Order';

export const OrdersItem = ({ order }: { order: TOrderWithLineItems }) => {
  const created_at = new Date(order.created_at).toDateString();
  return (
    <Container as='div' rounded='sm' padding='lg' className='bg-slate-100'>
      <Container as='div' flex='col' className='mb-3 md:flex-row md:items-end'>
        <Heading as='h3' content={created_at} />

        <Container as='div' flex='row'>
          <Container as='p'>Order ID:</Container>
          <Container as='p' className='italic text-gray-600'>
            {order.order_id}
          </Container>
        </Container>
      </Container>

      <Container as='div' flex='col' paddingX='lg'>
        {order.line_items.map((item) => (
          <Container
            key={item.line_item_id}
            as='div'
            flex='row'
            className='items-start border-b last-of-type:border-none py-1'
          >
            <Container as='p' className='italic text-gray-600'>
              x{item.quantity}
            </Container>
            <Container as='p' className='italic text-gray-600'>
              {item.product_variant.size}
            </Container>
            <Container as='div'>
              <Container as='p'>{item.product_variant.product.name}</Container>
              <Container as='p' className='italic text-gray-600'>
                {item.product_variant.product.category?.name}
              </Container>
            </Container>
          </Container>
        ))}
      </Container>
    </Container>
  );
};
