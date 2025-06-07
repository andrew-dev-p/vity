// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextRequest } from "next/server";
import { AuthUser } from "@supabase/supabase-js";

declare module "next/server" {
  interface NextRequest {
    user: AuthUser;
  }
}
