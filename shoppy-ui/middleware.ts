import { NextRequest } from "next/server";

//routes that do not need authorization
const unauthorizedRoutes = ["/auth/login", "/auth/signup"];

export function middleware(request: NextRequest){
    const auth = request.cookies.get("Authentication")?.value;

    //this redirects to the login page if cookie is not found and it is not the login or sign up page
    if(
        !auth && 
        !unauthorizedRoutes.some(route => 
            request.nextUrl.pathname.startsWith(route)
        )
    ){
        return Response.redirect(new URL("/auth/login", request.url))
    }
}

//this does not apply the middleware on these extensions
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}