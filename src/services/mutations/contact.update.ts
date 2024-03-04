import { ContactFormData } from '@/features/dashboard/home/components/contact/validator/contact.validator';
import { Contact } from '@prisma/client';

export const updateContact = async (
  formData: ContactFormData
): Promise<Contact | undefined> => {
  try {
    const url = `/api/user/contact/edit`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

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
