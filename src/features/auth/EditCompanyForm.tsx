'use client';

import { EditCompanyValidator } from '@/lib/validators/company';
import { zodResolver } from '@hookform/resolvers/zod';
import { Company, User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface EditCompanyFormProps {
  user: Pick<User, 'id'>;
  company: Omit<Company, 'userId'> | null;
}

type FormData = z.infer<typeof EditCompanyValidator>;

export default function EditCompanyForm({
  user,
  company,
}: EditCompanyFormProps) {
  const router = useRouter();

  const { handleSubmit, register } = useForm<FormData>({
    resolver: zodResolver(EditCompanyValidator),
    defaultValues: {
      name: company?.name || '',
    },
  });

  const { mutate: updateCompany, isLoading } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const payload = { name };

      const { data } = await axios.patch(`/api/edit-company`, payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form onSubmit={handleSubmit((e) => updateCompany(e))}>
      <label htmlFor='name'>Company Name</label>
      <input
        className='border-2 rounded-md'
        type='text'
        id='name'
        {...register('name')}
      />
      <button disabled={isLoading}>Update Company Information</button>
    </form>
  );
}
