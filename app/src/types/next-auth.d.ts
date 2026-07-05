import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      available_services: string[];
    } & DefaultSession["user"];
  }
}