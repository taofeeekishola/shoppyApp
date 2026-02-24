import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "./error";

export const post = async(path: string, formData: FormData) =>{
    const res = await fetch(`${API_URL}/${path}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Object.fromEntries(formData)),
    });

    const parseRes = await res.json();

    //return an error
    if(!res.ok){
        return {error: getErrorMessage(parseRes)};
    }

    return {error:""};
}