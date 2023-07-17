import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = async (address: string, userId: string) => {
 if (supabase) {
  return supabase;
 }
 const response = await fetch("/api/auth", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({ address, userId }),
 });
 const { token } = await response.json();
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
