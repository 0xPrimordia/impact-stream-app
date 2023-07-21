import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import {
 verifyAccessToken,
 verifyRefreshToken,
 generateAccessToken,
} from "../lib/auth";

export default async function middleware(request: NextRequest) {
 const handleI18nRouting = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ee", "fr"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
 });
 const response = handleI18nRouting(request);
 const locale = request.cookies.get("NEXT_LOCALE")?.value;
 const refreshToken = request.cookies.get("supabase-refresh-token")?.value;

 if (!refreshToken) {
  response.cookies.delete("privy-refresh-token");
  response.cookies.delete("privy-token");
  if (
   request.nextUrl.pathname === "/" ||
   request.nextUrl.pathname === `/${locale}`
  ) {
   return response;
  } else {
   return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
 }

 const verifiedRefreshToken = await verifyRefreshToken(refreshToken);

 if (
  !verifiedRefreshToken ||
  (verifiedRefreshToken.exp as number) < Date.now() / 1000
 ) {
  response.cookies.delete("privy-refresh-token");
  response.cookies.delete("privy-token");
  if (
   request.nextUrl.pathname === "/" ||
   request.nextUrl.pathname === `/${locale}`
  ) {
   return response;
  } else {
   return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
 }

 const accessToken = request.cookies.get("supabase-access-token")?.value;

 if (!accessToken) {
  const newAccessToken = await generateAccessToken(
   verifiedRefreshToken.address as string,
   verifiedRefreshToken.sub as string
  );
  response.cookies.set("supabase-access-token", newAccessToken);
 } else {
  const verifiedAccessToken = await verifyAccessToken(accessToken);
  if (
   !verifiedAccessToken ||
   (verifiedAccessToken.exp as number) < Date.now() / 1000
  ) {
   const newAccessToken = await generateAccessToken(
    verifiedAccessToken?.address as string,
    verifiedAccessToken?.sub as string
   );
   response.cookies.set("supabase-access-token", newAccessToken);
  }
 }

 return response;
}
export const config = {
 // Skip all paths that should not be internationalized. This example skips the
 // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
 matcher: ["/((?!api|_next|.*\\..*).*)"],
};
