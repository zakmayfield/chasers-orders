import { User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & {
      user_id: string;
      is_approved: boolean;
      email_verified_on: Date | null;
    };
  }
}

declare module 'next-auth' {
  interface User {
    is_approved: boolean;
    email_verified_on: Date | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user_id: string;
    is_approved: boolean;
    email_verified_on: Date | null;
  }
}
