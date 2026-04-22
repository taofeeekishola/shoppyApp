import { cookies } from "next/headers"
import { AUTHENTICATION_COOKIE } from "../auth-cookie";

//getting the cookie from the header and returning a boolean
export default async function authenticated() {
  const cookieStore = await cookies()
  return !!cookieStore.get(AUTHENTICATION_COOKIE)?.value;
}