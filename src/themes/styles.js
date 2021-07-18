import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  // breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 730,
      md: 800,
      lg: 990,
      xl: 1200,
    },
  },
  //pallettes
  palette: {
    primary: {
      main: "#f6f6f6",
      contrastText: "#2e604a",
    },
    secondary: {
      main: "#0e5159",
      contrastText: "#fff",
    },
  },
   // typography
   typography: {
    fontFamily: [
      '"Open Sans"',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: [
        '"Exo 2"',
        'sans-serif',
      ].join(','),
    },
    h2: {
      fontFamily: [
        '"Exo 2"',
        'sans-serif',
      ].join(','),
    },
    h3: {
      fontFamily: [
        '"Exo 2"',
        'sans-serif',
      ].join(','),
    },
    h4: {
      fontFamily: [
        '"Exo 2"',
        'sans-serif',
      ].join(','),
    },
    h5: {
      fontFamily: [
        '"Exo 2"',
        'sans-serif',
      ].join(','),
    },
    h6: {
      fontFamily: [
        '"Exo 2"',
        'sans-serif',
      ].join(','),
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  header_styles: {
    color: "red",
  },
}));
