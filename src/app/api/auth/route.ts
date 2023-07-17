import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Create a single supabase client with admin rights
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(request: Request) {
  const { address, userId } = await request.json();
  const token = jwt.sign(
    {
      address,
      sub: userId,
      aud: "authenticated",
    },
    process.env.SUPABASE_JWT_SECRET as string,
    {
      expiresIn: 60 * 2,
    }
  );
  const { error } = await supabaseAdmin.from("users").insert({
    id: userId,
    address,
  });
  console.log(error);
  return NextResponse.json({
    token,
  });
}
