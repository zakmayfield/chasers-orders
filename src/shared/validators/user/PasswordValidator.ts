import { z } from 'zod';

export const PasswordValidator = z.object({
  old_password: z
    .string()
    .min(3, { message: 'Old Password is a required field' }),
  new_password: z
    .string()
    .min(3, { message: 'New Password is a required field' }),
});
