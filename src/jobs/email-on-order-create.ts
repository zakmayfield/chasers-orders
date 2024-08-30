import { eventTrigger } from '@trigger.dev/sdk';
import { client } from '@/lib/trigger';
import { TSendEmailProps, sendEmail } from '@/shared/utils/email/sendEmail';

client.defineJob({
  id: 'send-order-confirmation-email',
  name: 'Send Order Confirmation Email',
  version: '1.0.0',
  trigger: eventTrigger({
    name: 'order.created',
  }),
  run: async (payload: TSendEmailProps, io) => {
    await io.logger.info('Running send-email task...');

    await io.runTask('send-email', async () => {
      try {
        const response = await sendEmail(payload);
        return response ? 'success' : undefined;
      } catch (error) {
        if (error instanceof Error) {
          return error.message;
        }
      }
    });

    await io.logger.info('Job completed ✨');
  },
});
