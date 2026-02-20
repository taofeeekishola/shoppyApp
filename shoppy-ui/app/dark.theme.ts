"use client"

import { createTheme } from "@mui/material"

 //this ensures it is only used on the client side

const darkTheme = createTheme({
    palette:{
        mode:"dark"
    }
})

export default darkTheme