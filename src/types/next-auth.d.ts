import { User } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    is_approved: boolean;
    email_verified_on: Date | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string;
      is_approved: boolean;
      email_verified_on: Date | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    is_approved: boolean;
    email_verified_on: Date | null;
  }
}
