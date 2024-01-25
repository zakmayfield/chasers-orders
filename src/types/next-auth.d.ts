import { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

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
