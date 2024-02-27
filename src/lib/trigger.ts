import { TriggerClient } from '@trigger.dev/sdk';

export const client = new TriggerClient({
  id: 'chasers-juice-jobs-r5f1',
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
});
