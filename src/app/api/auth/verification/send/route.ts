import {
  SendEmailAPIResponse,
  TransporterResponse,
  sendEmail,
} from '@/features/dashboard/verify-email/utils.verify-email';
import { getAuthSession } from '@/lib/auth/auth.options';

async function handler() {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new Response(JSON.stringify('Unauthenticated.'), { status: 401 });
  }

  const verificationToken = '123';

  try {
    const sendEmailResponse: TransporterResponse = await sendEmail({
      verificationToken,
      email: session.user.email!,
    })
      .then((response) => response)
      .catch((error) => error);

    if (sendEmailResponse instanceof Error) {
      return new Response(
        JSON.stringify(
          `Send Verification Email Error: ${sendEmailResponse.message}`
        ),
        {
          status: 400,
        }
      );
    }

    const verificationEmailResponse: SendEmailAPIResponse = {
      accepted: !!sendEmailResponse.accepted,
      transporterMessageId: sendEmailResponse.messageId,
      responseMessage: `Verification email successfully sent`,
    };

    return new Response(JSON.stringify(verificationEmailResponse));
  } catch (error) {
    if (error instanceof Error) {
      if (error.message)
        return new Response(JSON.stringify(error.message), { status: 500 });
    }
  }
}

export { handler as GET };
