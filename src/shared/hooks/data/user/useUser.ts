import { QueryKeys } from '@/shared/types/Cache';
import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { userServices } from '@/shared/utils/services/userServices';
import { TCompanyWithAddress, TFullUser, TUser } from '@/shared/types/User';
import { useToast } from '../../utils';
import { useQueryClient } from '@tanstack/react-query';

export const useGetUser = ({ fullUser }: { fullUser?: boolean }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.USER],
    queryFn: async () => await userServices.getUser({ fullUser }),
    staleTime: Infinity,
  });

  const dataMap = {
    full: (fullUser && data && (data as TFullUser)) || undefined,
    compact: (!fullUser && data && (data as TUser)) || undefined,
  };

  return { data: dataMap, isLoading, error };
};

export const useGetContact = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CONTACT],
    queryFn: async () => await userServices.getContactByUserId(),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetCompany = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.COMPANY],
    queryFn: userServices.getCompanyByUserId,
    staleTime: Infinity,
  });

  return { company: data, isLoading, error };
};

export const useGetShipping = ({ company_id }: { company_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.SHIPPING],
    queryFn: async () =>
      await userServices.getShippingByCompanyId({ company_id }),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetBilling = ({ company_id }: { company_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.BILLING],
    queryFn: async () =>
      await userServices.getBillingByCompanyId({ company_id }),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useGetUserAuthorization = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.AUTHORIZATION],
    queryFn: async () => await userServices.getUserAuthorizationByEmail(),
    staleTime: Infinity,
  });
  return { data, isLoading, error };
};

export const useUpdateInstructions = () => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate, isLoading, error, isSuccess } = useCustomMutation({
    mutationFn: userServices.updateInstructions,
    handleError(error) {
      notify(error.message, 'error');
    },
    handleSuccess(data) {
      notify('Updated delivery instructions');

      queryClient.setQueryData<TCompanyWithAddress>(
        [QueryKeys.COMPANY],
        (oldData) => {
          return oldData
            ? {
                ...oldData,
                shipping: {
                  ...oldData.shipping!,
                  deliveryInstructions: data.deliveryInstructions,
                },
              }
            : oldData;
        }
      );
    },
  });

  return { mutate, isLoading, error, isSuccess };
};
