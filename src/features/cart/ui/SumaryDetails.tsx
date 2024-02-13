import { getCart } from '@/services/queries/cart.getCart';
import { CartCache, UnitsOnCartCacheType } from '@/types/types.cart';
import { useQuery } from '@tanstack/react-query';

const SummaryDetails = () => {
  const { data } = useQuery<CartCache | undefined, Error>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: Infinity,
  });

  return (
    <div className='col-span-3 border'>
      <div>summary</div>
      {data &&
        data.items.length > 0 &&
        data.items.map((item) => <Detail key={item.unitId} item={item} />)}
    </div>
  );
};

function Detail({ item }: { item: UnitsOnCartCacheType }) {
  const { unit, quantity } = item;
  return <div></div>;
}

export default SummaryDetails;
