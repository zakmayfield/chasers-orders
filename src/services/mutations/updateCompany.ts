import type { Company } from '@prisma/client';
import { fetchHandler } from '@/utils/fetch';
import { CompanyFormData } from '@/types/user';

export const updateCompany = async (
  formData: CompanyFormData
): Promise<Company> =>
  await fetchHandler({
    route: '/user/company/edit',
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
