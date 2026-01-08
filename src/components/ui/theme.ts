import { createTheme } from '@mui/material/styles';

// This file serves to customize MUI standard layout to be the same as our pre-defined styles
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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ccc",
              transition: "border-color 200ms ease-in-out",
            },
            "&:hover fieldset": {
              borderColor: "var(--ubs-red)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--ubs-red)",
            },
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "#ccc",
            transition: "border-bottom-color 200ms ease-in-out",
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "var(--ubs-red)",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "var(--ubs-red)",
          },
          "&.Mui-focused .MuiInput-underline:after": {
            borderBottomColor: "var(--ubs-red)",
          },
        },
      },
    },
  },
});
