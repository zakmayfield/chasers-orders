import { User } from 'next-auth';

declare module 'next-auth' {
  interface User {
    is_approved: boolean;
    email_verified_on: Date | null;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      cart_id: string;
      email: string;
      is_approved: boolean;
      email_verified_on: Date | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    cart_id: string;
    email: string;
    is_approved: boolean;
    email_verified_on: Date | null;
  }
}
