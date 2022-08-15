import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let myTheme = createTheme({
  palette: {
    primary: {
      light: "#115c88",
      main: "#0c4160",
      dark: "#082e44",
    },
    secondary: {
      light: "#d6d3c2",
      main: "#aea885",
      dark: "#8a835c",
    },
    gray: {
      main: "#999999",
    },
    black: "#000000",
  },
  typography: {
    fontFamily: ["Roboto"],
  },
});

myTheme = responsiveFontSizes(myTheme);

export default myTheme;
