import { db } from '@/lib/prisma';
import { sendEmail } from '@/utils/email';
import { SendEmailAPIResponse, TransporterResponse } from '@/types/email';
import { authenticateSession } from '@/utils/auth';

async function handler() {
  const session = await authenticateSession();
  if (session instanceof Response) {
    return session;
  }
  const { id, email } = session;

  try {
    //^ fetch token record
    const tokenRecord = await db.verificationToken.findUniqueOrThrow({
      where: { userId: id },
    });

    //^ evoke sendEmail with data
    const sendEmailResponse: TransporterResponse = await sendEmail({
      verificationToken: tokenRecord.token,
      email: email,
    })
      .then((response) => response)
      .catch((error) => error);

    //^ throw email response error
    if (sendEmailResponse instanceof Error) {
      return new Response(
        `Send Verification Email Error: ${sendEmailResponse.message}`,
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
      if (error.message) return new Response(error.message, { status: 500 });
    }
  }
}

export { handler as GET };
