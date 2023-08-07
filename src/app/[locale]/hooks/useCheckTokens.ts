import { useState, useEffect } from "react";
import { getCookie, setCookie, hasCookie } from "cookies-next";
import {
 verifyAccessToken,
 verifyRefreshToken,
 generateAccessToken,
} from "../../../../lib/auth";
import { usePrivy } from "@privy-io/react-auth";

export default function useCheckTokens() {
 const [isAccessTokenValid, setIsAccessTokenValid] = useState<boolean>(true);
 const [isRefreshTokenValid, setIsRefreshTokenValid] = useState<boolean>(true);
 const { user } = usePrivy();

 useEffect(() => {
  const checkTokenExpirations = async () => {
   if (!hasCookie("supabase-refresh-token")) {
    setIsRefreshTokenValid(false);
   } else {
    const refreshToken = getCookie("supabase-refresh-token");
    const refreshPayload = await verifyRefreshToken(refreshToken as string);
    const now = Date.now() / 1000;
    if (!refreshPayload || now > (refreshPayload.exp as number)) {
     setIsRefreshTokenValid(false);
    } else {
     setIsRefreshTokenValid(true);
    }
   }
   if (!hasCookie("supabase-access-token")) {
    setIsAccessTokenValid(false);
    const newAccessToken = await generateAccessToken(
     user?.wallet?.address as string,
     user?.id as string
    );
    setCookie("supabase-access-token", newAccessToken, {
     maxAge: 60 * 60 * 24 * 30,
     secure: true,
     sameSite: "strict",
    });
    setIsAccessTokenValid(true);
   } else {
    const accessToken = getCookie("supabase-access-token");
    const accessPayload = await verifyAccessToken(accessToken as string);
    const now = Date.now() / 1000;
    if (!accessPayload || now > (accessPayload.exp as number)) {
     setIsAccessTokenValid(false);
     const newAccessToken = await generateAccessToken(
      accessPayload?.address as string,
      accessPayload?.sub as string
     );
     setCookie("supabase-access-token", newAccessToken, {
      maxAge: 60 * 60 * 24 * 30,
      secure: true,
      sameSite: "strict",
     });
     setIsAccessTokenValid(true);
    } else {
     setIsAccessTokenValid(true);
    }
   }
  };
  checkTokenExpirations();
  const intervalId = setInterval(checkTokenExpirations, 60000);
  return () => clearInterval(intervalId);
 }, []);
 return { isAccessTokenValid, isRefreshTokenValid };
}
