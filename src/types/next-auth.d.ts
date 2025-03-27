import 'next-auth';

declare module 'next-auth' {
  interface User {
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'ADMIN' | 'TEACHER' | 'STUDENT';
    }
  }
} 