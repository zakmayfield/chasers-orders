export type UpdateUserVerificationRequest = {
  token?: string;
};
export type UpdateUserVerificationResponse = {
  accepted: boolean;
  id: string;
  email: string;
  verifiedOn: string;
  isApproved: boolean;
};
