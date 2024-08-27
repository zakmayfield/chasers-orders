export type TBatchPayload = {
  count: number;
};

export type TUpdateUserVerificationRequest = {
  token?: string;
};
export type TUpdateUserVerificationResponse = {
  id: string;
  email: string;
  is_approved: boolean;
  email_verified_on: Date | null;
};
