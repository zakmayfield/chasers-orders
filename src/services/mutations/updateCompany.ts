import type { Company } from '@prisma/client';
import { CompanyFormData } from '@/features/dashboard/home/components/company/validator/company.validator';
import { fetchHandler } from '@/utils/fetch';

export const updateCompany = async (
  formData: CompanyFormData
): Promise<Company | undefined> =>
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
