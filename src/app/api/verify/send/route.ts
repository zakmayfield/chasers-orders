import {
  SendEmailAPIResponse,
  TransporterResponse,
  sendEmail,
} from '@/features/verify/utils.verify';
import { getAuthSession } from '@/lib/auth/auth.options';
import { db } from '@/lib/prisma';

async function handler() {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return new Response(JSON.stringify('Unauthenticated.'), { status: 401 });
  }

  try {
    //^ fetch token record
    const tokenRecord = await db.verificationToken.findUniqueOrThrow({
      where: { userId: session.user.id },
    });

    //^ evoke sendEmail with data
    const sendEmailResponse: TransporterResponse = await sendEmail({
      verificationToken: tokenRecord.token,
      email: session.user.email!,
    })
      .then((response) => response)
      .catch((error) => error);

    //^ throw email response error
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

    //^ handle success response & return
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
