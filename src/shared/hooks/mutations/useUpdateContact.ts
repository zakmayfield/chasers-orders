import { ContactFormData } from '@/shared/validators/ContactValidator';
import { UserData } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../general.hooks';
import { updateContact } from '@/services/mutations/updateContact';

export const useUpdateContact = ({
  handleSwitchEditCallback,
  handleResetFormCB,
}: {
  handleSwitchEditCallback: () => void;
  handleResetFormCB?: (data: ContactFormData) => void;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate: edit, isSuccess } = useMutation({
    mutationFn: updateContact,
    onSuccess(data) {
      // will need to make this a bit more modular for `company` to use it without error
      queryClient.setQueryData(
        ['user-dashboard'],
        (oldData: UserData | undefined) => {
          const payload = data && {
            id: data.id,
            name: data.name,
            phoneNumber: data.phoneNumber,
            position: data.position,
            userId: data.userId,
          };
          return oldData ? { ...oldData, contact: payload! } : oldData;
        }
      );

      // call handleSwitchEditCallback function to handle the form UI switch
      handleSwitchEditCallback();
      // handle reset form state
      if (data && handleResetFormCB) {
        const { name, position, phoneNumber } = data;
        handleResetFormCB({ name, position, phoneNumber });
      }

      // notify
      notify('Succesfully updated');
    },
  });

  return { edit, isSuccess };
};
