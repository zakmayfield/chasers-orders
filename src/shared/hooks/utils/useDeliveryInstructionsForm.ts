import { useEffect, useState } from 'react';
import { useCustomForm } from '@/shared/hooks/custom';
import { instructionsResolver } from '@/shared/validators/resolvers';
import { useUpdateInstructions } from '../data/user/useUser';

export const useDeliveryInstructionsForm = ({
  defaultValues,
  company_id,
}: {
  defaultValues: string;
  company_id: string;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const { mutate, isSuccess } = useUpdateInstructions();

  const {
    methods,
    methods: { handleSubmit, getValues, reset },
  } = useCustomForm({
    defaultValues: { deliveryInstructions: defaultValues },
    resolver: instructionsResolver,
  });

  const toggleEdit = () => setIsEdit(!isEdit);

  const submit = () => {
    const args = {
      company_id,
      deliveryInstructions: getValues().deliveryInstructions,
    };

    handleSubmit(() => mutate(args))();
  };

  const cancel = () => {
    toggleEdit();
    reset({ deliveryInstructions: defaultValues });
  };

  useEffect(() => {
    if (isSuccess) {
      reset(getValues());
      toggleEdit();
    }
  }, [isSuccess]);

  return {
    methods,
    isEdit,
    toggleEdit,
    submit,
    cancel,
  };
};
