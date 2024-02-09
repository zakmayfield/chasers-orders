import { toast, ToastContainer } from 'react-toastify';
import type { Id, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UseToastProps {
  (): {
    notify: (message: string, variant?: Variants) => Id;
  };
}

type Variants = 'success' | 'error' | 'warn' | 'info';

export const useToast: UseToastProps = () => {
  const notify = (message: string, variant?: Variants) => {
    const defaultVariant = !variant ? 'success' : variant;
    return toast[defaultVariant](message);
  };

  return {
    notify,
  };
};
