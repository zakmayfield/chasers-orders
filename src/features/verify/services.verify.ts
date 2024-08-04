import { VerifyServiceResponse } from '@/types/verification';
import { SendEmailAPIResponse } from '@/features/verify/utils.verify';

//^ Verify Email with Token

interface IVerifyEmailWithToken {
  ({ token }: { token?: string }): Promise<VerifyServiceResponse>;
}

export const verifyEmailWithToken: IVerifyEmailWithToken = async ({
  token,
}) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const url = baseURL + '/api/verify';
    const options: RequestInit | undefined = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token }),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const verifyPayload = response.json();

    return verifyPayload;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

//^ Send Verification Email

interface ISendVerificationEmail {
  (): Promise<SendEmailAPIResponse>;
}

export const sendVerificationEmail: ISendVerificationEmail = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = baseUrl + '/api/verify/send';
    const response = await fetch(url);

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
