import { DefaultValues, FieldValues, Resolver, useForm } from 'react-hook-form';

export type UseCustomFormParams<T extends FieldValues> = {
  defaultValues: DefaultValues<T>;
  resolver: Resolver<T>;
};

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
