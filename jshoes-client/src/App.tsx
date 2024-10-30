import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import theme from "./theme";
import Home from "./components/Home";
import ShoeDetail from "./components/ShoeDetail";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import FavoritePage from "./components/FavoritePage";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">(
    (Cookies.get("theme") as "light" | "dark") || "light"
  );

  // Memorize the theme to avoid re-render
  const currentTheme = useMemo(() => theme(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    Cookies.set("theme", newMode, { expires: 365 });
  };

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Nav onToggleTheme={toggleTheme} mode={mode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shoes/:id" element={<ShoeDetail />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>

        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default App;
