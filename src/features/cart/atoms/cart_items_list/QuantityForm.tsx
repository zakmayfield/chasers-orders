import { ContentWrapper } from '@/shared/components/containers';
import { Btn } from '@/shared/components/ui';
import { useCustomForm } from '@/shared/hooks/custom';
import { useUpdateQuantity } from '@/shared/hooks/data/cart/useCart';
import { XCircleDuotone } from '@/shared/utils/ui';
import { quantityResolver } from '@/shared/validators/resolvers';
import { useEffect } from 'react';

type TQuantityFormProps = {
  currentQuantity: number;
  product_variant_id: string;
};

export const QuantityForm = (props: TQuantityFormProps) => {
  const { currentQuantity, product_variant_id } = props;

  const { mutate } = useUpdateQuantity();

  const { methods } = useCustomForm({
    defaultValues: {
      quantity: currentQuantity,
    },
    resolver: quantityResolver,
  });

  const submit = () => {
    const quantity = methods.getValues().quantity;
    mutate({ product_variant_id, quantity });
  };

  useEffect(() => {
    methods.formState.isSubmitSuccessful &&
      methods.reset({ quantity: methods.getValues().quantity });
  }, [methods.formState.isSubmitSuccessful]);

  return (
    <form onSubmit={methods.handleSubmit(submit)}>
      <ContentWrapper flex='row'>
        <label htmlFor='quantity'>Qty</label>
        <input
          type='number'
          id='quantity'
          min={1}
          {...methods.register('quantity', { valueAsNumber: true })}
          className='h-8 rounded w-16 border px-3'
        />
        {methods.formState.isDirty && (
          <Btn
            type='submit'
            text='save'
            bgColor='green'
            height='sm'
            isDisabled={
              !methods.formState.isDirty || !methods.formState.isValid
            }
          />
        )}
        {methods.formState.isDirty && (
          <Btn
            Icon={XCircleDuotone}
            height='sm'
            handleClick={() => methods.reset({ quantity: currentQuantity })}
          />
        )}
      </ContentWrapper>
    </form>
  );
};
