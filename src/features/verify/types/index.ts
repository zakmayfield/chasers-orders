import { UseMutateFunction } from '@tanstack/react-query';

export type VerifyAPIResponse = {
  accepted: boolean;
  id: string;
  email: string;
  verifiedOn: string;
  isApproved: boolean;
};

export type VerifyMutation = UseMutateFunction<
  VerifyAPIResponse,
  Error,
  VerifyMutationArgs,
  unknown
>;

export type VerifyMutationArgs = {
  token?: string;
};

export type VerifyServiceResponse = VerifyAPIResponse;
