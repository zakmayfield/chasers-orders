import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSignInValidator } from '@/shared/validators/auth';

export const signInResolver = zodResolver(AuthSignInValidator);
