declare module "next-auth" {
  interface User {
    role_id?: string; // Add your custom property here
  }

  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      user_id?: number;
      image?: string | null;
      role_id?: number; // Add your custom property here
    };
  }
}
