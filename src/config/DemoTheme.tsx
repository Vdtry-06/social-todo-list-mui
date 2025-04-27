import { createTheme } from "@mui/material/styles";

export const demoTheme = createTheme({
    colorSchemes: {
        light: true,
        dark: true
    },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    breakpoints: {
        values: {
            xs: 0, // mobile
            sm: 600, // small monitor
            md: 600, // 768 | 960
            lg: 1200, // desktop
            xl: 1536, // 4k monitor
        },
    },
});