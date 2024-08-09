'use client';
import { FieldValues, useForm } from 'react-hook-form';
import { UseCustomFormParams } from '@/types/hooks';

export const useCustomForm = <T extends FieldValues>({
  defaultValues,
  resolver,
}: UseCustomFormParams<T>) => {
  const methods = useForm({
    defaultValues,
    resolver,
  });

  return { methods };
};
