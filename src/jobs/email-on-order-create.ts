import { eventTrigger } from '@trigger.dev/sdk';
import { client } from '@/lib/trigger';
import { sendOrderEmail } from '@/utils/email';
import { SendOrderEmailPayload } from '@/types/email';

client.defineJob({
  id: 'send-order-confirmation-email',
  name: 'Send Order Confirmation Email',
  version: '1.0.0',
  trigger: eventTrigger({
    name: 'order.created',
  }),
  run: async (payload: SendOrderEmailPayload, io) => {
    await io.logger.info('Running send-email task...');

    await io.runTask('send-email', async () => {
      try {
        const response = await sendOrderEmail(payload);
        return response;
      } catch (error) {
        if (error instanceof Error) {
          return error.message;
        }
      }
    });

    await io.logger.info('Job completed ✨');
  },
});
