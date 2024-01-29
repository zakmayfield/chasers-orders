import { NextAuthOptions, getServerSession } from 'next-auth';
import { authConfig } from './auth.config';

export const authOptions: NextAuthOptions = {
  ...authConfig,
};

export const getAuthSession = () => getServerSession(authOptions);
