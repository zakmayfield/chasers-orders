import { Container } from '@/shared/components/ui';
import { AccordionContext } from '@/shared/hooks/utils';
import { TLineItemWithProductData } from '@/shared/types/Order';

export const OrdersItemBody = ({
  order_id,
  line_items,
  accordionCtx: { isExpanded },
}: {
  order_id: string;
  line_items: TLineItemWithProductData[];
  accordionCtx: AccordionContext;
}) => {
  return (
    <Container
      as='div'
      flex='col'
      paddingX='lg'
      className={`${!isExpanded(order_id) && 'hidden'}`}
    >
      {line_items.map((item) => (
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
  );
};
