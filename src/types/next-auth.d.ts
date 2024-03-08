import { User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string;
      isApproved: boolean;
      emailVerified: Date | null;
    };
  }
}

declare module 'next-auth' {
  interface User {
    isApproved: boolean;
    emailVerified: Date | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    isApproved: boolean;
    emailVerified: Date | null;
  }
}
