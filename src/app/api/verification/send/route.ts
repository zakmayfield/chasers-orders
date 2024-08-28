import { db } from '@/lib/prisma';
import { TransporterResponse, sendEmail } from '@/shared/utils/email/sendEmail';
import { TSendVerificationEmailResponse } from '@/shared/types/API';
import { authenticateSession } from '@/shared/utils/api/authenticateSession';

async function handler() {
  const session = await authenticateSession();
  if (session instanceof Response) {
    return session;
  }
  const { id, email } = session;

  try {
    const tokenRecord = await db.verificationToken.findUniqueOrThrow({
      where: { user_id: id },
    });

    const sendEmailResponse: TransporterResponse = await sendEmail({
      type: 'verification',
      to: email,
      verificationToken: tokenRecord.token,
    })
      .then((response) => response)
      .catch((error) => error);

    if (sendEmailResponse instanceof Error) {
      return new Response(
        `Send Verification Email Error: ${sendEmailResponse.message}`,
        {
          status: 400,
        }
      );
    }

    const verificationEmailResponse: TSendVerificationEmailResponse = {
      accepted: !!sendEmailResponse.accepted,
      transporterMessageId: sendEmailResponse.messageId,
      responseMessage: `Verification email successfully sent`,
    };

    return new Response(JSON.stringify(verificationEmailResponse));
  } catch (error) {
    if (error instanceof Error) {
      return new Response('Unable to send verification email at this time', {
        status: 500,
      });
    }
  }
}

export { handler as GET };
