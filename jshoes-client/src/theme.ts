import { createTheme } from "@mui/material/styles";

const theme = (mode: "light" | "dark") => {
  return createTheme({
    palette: {
      mode: mode,
    },
    typography: {
      fontFamily: "Just Me Again Down Here",
      fontSize: 16,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "0",
          },
        },
      },
    },
  });
};

export default theme;
