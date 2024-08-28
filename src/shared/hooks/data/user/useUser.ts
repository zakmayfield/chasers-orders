import { QueryKeys } from '@/shared/types/Cache';
import { useCustomQuery } from '../../custom';
import { userServices } from '@/shared/utils/services/userServices';

export const useGetUser = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.USER],
    queryFn: async () => await userServices.getUser(),
  });
  return { data, isLoading, error };
};

export const useGetFullUser = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.USER_FULL],
    queryFn: async () => await userServices.getFullUser(),
  });
  return { data, isLoading, error };
};

export const useGetContact = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.CONTACT],
    queryFn: async () => await userServices.getContactByUserId(),
  });
  return { data, isLoading, error };
};

export const useGetCompany = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.COMPANY],
    queryFn: async () => await userServices.getCompanyByUserId(),
  });
  return { data, isLoading, error };
};

export const useGetFullCompany = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.COMPANY],
    queryFn: async () => await userServices.getCompanyWithAddressByUserId(),
  });
  return { data, isLoading, error };
};

export const useGetShipping = ({ company_id }: { company_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.SHIPPING],
    queryFn: async () =>
      await userServices.getShippingByCompanyId({ company_id }),
  });
  return { data, isLoading, error };
};

export const useGetBilling = ({ company_id }: { company_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.BILLING],
    queryFn: async () =>
      await userServices.getBillingByCompanyId({ company_id }),
  });
  return { data, isLoading, error };
};

export const useGetUserAuthorization = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.AUTHORIZATION],
    queryFn: async () => await userServices.getUserAuthorizationByEmail(),
  });
  return { data, isLoading, error };
};
