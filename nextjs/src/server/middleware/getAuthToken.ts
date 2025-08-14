import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/authOptions";

/**
 * 
ref: middleware.getToken.error.doc in obsidian

https://stackoverflow.com/questions/77115912/how-the-get-the-nextauth-session-in-a-middleware

todo fix bug : token.isProfileSetupDone , currently this added field is unavailable in token , so it does not redirect
alternate solution :  Store isProfileSetupDone in a custom cookie at login.
Then read it directly in middleware using request.cookies.get("your-cookie-name").

seems this bug is inconsistent , now i am able to read latest token and redirect
 */
export async function getAuthToken(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    decode: authOptions.jwt?.decode,
  });
  return token;
}
