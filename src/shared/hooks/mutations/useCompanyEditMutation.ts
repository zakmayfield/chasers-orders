import { Company } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DashboardUserData } from '@/types/types.dashboard';
import { useToast } from '../general.hooks';
import { CompanyFormData } from '@/features/dashboard/home/components/company/validator/company.validator';

export const useCompanyEditMutation = ({
  handleSwitchEditCallback,
  handleResetFormCB,
}: {
  handleSwitchEditCallback: () => void;
  handleResetFormCB?: (data: CompanyFormData) => void;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate: edit, isSuccess } = useMutation({
    // TODO: Extract mutation function to the service mutations directory
    mutationFn: async (formData: CompanyFormData) => {
      const updateUser = async (): Promise<Company | undefined> => {
        try {
          const url = `/api/user/company/edit`;
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error(await response.text());
          }

          return response.json();
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
        }
      };

      const apiResponse = updateUser();
      return apiResponse;
    },
    onSuccess(data) {
      queryClient.setQueryData(
        ['user-dashboard'],
        (oldData: DashboardUserData | undefined) => {
          const company = {
            id: data!.id,
            name: data!.name,
            accountPayableEmail: data!.accountPayableEmail,
            paymentMethod: data!.paymentMethod,
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
