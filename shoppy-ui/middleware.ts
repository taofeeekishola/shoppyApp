import { NextRequest } from "next/server";
import authenticated from "./app/auth/authenticated";
import { unauthenticatedRoutes } from "./app/common/constants/routes";


//eensuring that we can only vist authenticated routes after logging in
export function middleware(request: NextRequest){
    

    //this redirects to the login page if cookie is not found and it is not the login or sign up page
    if(
        !authenticated() && 
        !unauthenticatedRoutes.some(route => 
            request.nextUrl.pathname.startsWith(route.path)
        )
    ){
        return Response.redirect(new URL("/auth/login", request.url))
    }
}

//this does not apply the middleware on these extensions
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}