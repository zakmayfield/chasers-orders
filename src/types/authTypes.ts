import { z } from 'zod';
import { UserAuthValidator } from './../lib/validators/user-auth';

export type UserAuthFormData = z.infer<typeof UserAuthValidator>;
