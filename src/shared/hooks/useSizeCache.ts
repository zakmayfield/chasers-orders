import { QueryKeys } from '@/types/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSizeCache = ({ productId }: { productId: string }) => {
  const queryClient = useQueryClient();

  function getSizeCache() {
    const sizeCache: string | undefined = queryClient.getQueryData([
      QueryKeys.SIZE,
      productId,
    ]);

    return sizeCache;
  }

  const { mutate: setSizeCache } = useMutation({
    mutationFn: async (value: string) => {
      queryClient.setQueryData([QueryKeys.SIZE, productId], value);
    },
  });

  return {
    getSizeCache,
    setSizeCache,
  };
};
