import { ContactFormData } from '@/features/dashboard/home/components/contact/validator/contact.validator';
import { DashboardUserData } from '@/types/types.dashboard';
import { Contact } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../general.hooks';
import { updateContact } from '@/services/mutations/contact.update';

// TODO: Change this
// kinda configured it only towards ContactFormData isntead of both Contact and Company
export const useDashboardEdit = ({
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
        (oldData: DashboardUserData | undefined) => {
          const payload = data && {
            id: data.id,
            name: data.name,
            phoneNumber: data.phoneNumber,
            position: data.position,
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
