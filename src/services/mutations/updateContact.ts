import { ContactFormData } from '@/types/user';
import { fetchHandler } from '@/utils/fetch';
import { Contact } from '@prisma/client';

export const updateContact = async (
  formData: ContactFormData
): Promise<Contact> =>
  await fetchHandler({
    route: '/user/contact/edit',
    options: {
      config: {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    },
  });
