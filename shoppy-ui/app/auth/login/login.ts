"use server";

import { jwtDecode } from "jwt-decode";
import { FormResponse } from "@/app/common/interface/form-response.interface";
import { API_URL } from "@/app/common/constants/api";
import { getErrorMessage } from "@/util/error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";
// import { AUTHENTICATION_COOKIE } from "./auth-cookie";

export default async function login(
    _prevState: FormResponse, formData: FormData
) {
     const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(Object.fromEntries(formData)),
        });
    
        const parseRes = await res.json();
    
        //return an error
        if(!res.ok){
            return {error: getErrorMessage(parseRes)};
        }
        
        await setAuthCookie(res);
        redirect("/")
}

/**
 * getting the cookier from the api response and decoding it
 * @param response 
 */
const setAuthCookie = async (response: Response) => {
    const setCookieHeader = response.headers.get("Set-Cookie");
    if(setCookieHeader){
        const token = setCookieHeader.split(';')[0].split('=')[1];
        const cookieStore = await cookies();

        cookieStore.set({
            name: AUTHENTICATION_COOKIE,
            value: token,
            secure:true,
            httpOnly: true,
            expires: new Date(jwtDecode(token).exp! * 1000)
        })
    }
}