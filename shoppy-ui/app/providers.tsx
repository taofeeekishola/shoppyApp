"use client"
//creating a client component to use Themeprovider
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@emotion/react";
import darkTheme from "./dark.theme";
import { ReactElement } from "react";
import { AuthContext } from "./auth/auth-context";

interface Providerprops{
  children : ReactElement[];
  authenticated: boolean;
}


export function Providers({children, authenticated}: Providerprops){
    return(
        <AppRouterCacheProvider>
          <ThemeProvider theme={darkTheme}>
            <AuthContext.Provider  value={authenticated}> 
                {children}
            </AuthContext.Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
    );
}