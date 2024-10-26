import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "Just Me Again Down Here",
    fontSize: 17,
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

export default theme;
