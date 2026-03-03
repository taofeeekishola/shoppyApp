"use server"

import { cookies } from "next/headers"
import { AUTHENTICATION_COOKIE } from "./auth-cookie";
import { redirect } from "next/navigation";

//deleting the cookie from the header
export default async function logout(){
    const cookieStore = await cookies()
    cookieStore.delete(AUTHENTICATION_COOKIE);

    redirect("/auth/login");
}