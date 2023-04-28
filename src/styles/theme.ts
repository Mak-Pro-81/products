import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "inherit",
    fontSize: 12,
    h1: {
      fontSize: "2.6rem",
      fontWeight: 500,
      lineHeight: 1.34,
    },
    h2: {
      fontSize: "2.2rem",
      fontWeight: 500,
      lineHeight: 1.36,
    },
    h3: {
      fontSize: "1.4rem",
      fontWeight: 500,
      lineHeight: 1.35,
    },
    subtitle1: {
      fontSize: "1.8rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: "translate(0, -20px) scale(0.75)",
        },
      },
    },
  },
});
