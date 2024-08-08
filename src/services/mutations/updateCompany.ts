import type { Company } from '@prisma/client';
import { CompanyFormData } from '@/shared/validators/user/CompanyValidator';
import { fetchHandler } from '@/utils/fetch';

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
