import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import { getCookie } from "cookies-next";
let supabase: SupabaseClient | null = null;

export const getSupabaseClient = async () => {
 const token = getCookie("supabase-access-token");
 supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
  {
   global: {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   },
  }
 );
 return supabase;
};
