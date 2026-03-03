import { cookies } from "next/headers"
import { AUTHENTICATION_COOKIE } from "./auth-cookie";

//deleting the cookie from the header
export default async function logout(){
    const cookieStore = await cookies()
    cookieStore.delete(AUTHENTICATION_COOKIE);
}