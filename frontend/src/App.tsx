import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/Register/Register";
import { HomePage } from "./pages/Homepage/Homepage";
import { createTheme, ThemeProvider } from "@mui/material";

const THEME = createTheme({
  typography: {
    fontFamily: `"Outfit", sans-serif`,
  },
});
function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
