import { cookies } from "next/headers"

//getting the cookie from the header and returning a boolean
export default async function authenticated() {
  const cookieStore = await cookies()
  return !!cookieStore.get("Authentication");
}