import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardUserData } from '@/types/types.dashboard';
import { useToast } from '../general.hooks';
import { CompanyFormData } from '@/features/dashboard/home/components/company/validator/company.validator';
import { updateCompany } from '@/services/mutations/updateCompany';

export const useUpdateCompany = ({
  handleSwitchEditCallback,
  handleResetFormCB,
}: {
  handleSwitchEditCallback: () => void;
  handleResetFormCB?: (data: CompanyFormData) => void;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate: edit, isSuccess } = useMutation({
    mutationFn: updateCompany,
    onSuccess(data) {
      queryClient.setQueryData(
        ['user-dashboard'],
        (oldData: DashboardUserData | undefined) => {
          const company = {
            id: data!.id,
            name: data!.name,
            accountPayableEmail: data!.accountPayableEmail,
            paymentMethod: data!.paymentMethod,
            userId: data!.userId,
          };
          return oldData
            ? { ...oldData, company: { ...oldData.company, ...company } }
            : oldData;
        }
      );

      // call handleSwitchEditCallback function to handle the form UI switch
      handleSwitchEditCallback();
      // handle reset form state
      if (data && handleResetFormCB) {
        const { name, paymentMethod, accountPayableEmail } = data;
        handleResetFormCB({ name, accountPayableEmail, paymentMethod });
      }

      // notify
      notify('Succesfully updated');
    },
  });

  return { edit, isSuccess };
};
