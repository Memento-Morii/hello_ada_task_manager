import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./features/Register/Register";
import { HomePage } from "./features/Homepage/Homepage";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CustomSnackBar } from "./components/SnackBar";

const THEME = createTheme({
  typography: {
    fontFamily: `"Outfit", sans-serif`,
  },
});
function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <CustomSnackBar />
        <Router>
          <Routes>
            <Route path="/" element={<RegisterPage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
