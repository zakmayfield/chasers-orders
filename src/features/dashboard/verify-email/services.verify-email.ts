// import { SendEmailAPIResponse } from '@/features/dashboard/verify-email/utils.verify-email';

// interface ISendVerificationEmail {
//   (): Promise<SendEmailAPIResponse>;
// }

// export const sendVerificationEmail: ISendVerificationEmail = async () => {
//   try {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
//     const url = baseUrl + '/api/auth/verification/send';
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(await response.text());
//     }

//     return response.json();
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//   }
// };

interface TokenValidatorReturn {
  ({ token }: { token: string | null }): Promise<string>;
}

export const verifyEmail: TokenValidatorReturn = async ({ token }) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = baseUrl + '/api/auth/verification/verify';
    const init: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token }),
    };

    const response = await fetch(url, init);

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
