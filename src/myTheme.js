import { createTheme } from '@mui/material/styles';

const myTheme = createTheme({
    palette: {
        primary: {
            light: '#115c88',
            main: '#0c4160',
            dark: '#082e44',
        },
        secondary: {
            light: '#d6d3c2',
            main: '#aea885',
            dark: '#8a835c',
        },
    },
});

export default myTheme;