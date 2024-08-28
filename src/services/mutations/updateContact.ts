import { ContactFormData } from '@/shared/types/Forms';
import { fetchHandler } from '@/shared/utils/api/fetch';
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
