import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "white",
          fontFamily: "inherit",
          boxShadow: "none",
          transition: "background-color 200ms ease-in-out, color 200ms ease-in-out, filter 200ms ease-in-out",
          "&:hover": {
            filter: "brightness(0.92)",
            transition: "background-color 200ms ease-in-out, color 200ms ease-in-out, filter 200ms ease-in-out",
          },
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            filter: "brightness(0.92)",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        
        button: {
          transition: "background-color 200ms ease-in-out, color 200ms ease-in-out",
        },
      },
    },
  },
});
