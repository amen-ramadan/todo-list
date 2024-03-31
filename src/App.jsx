import "./App.css";
import TodoList from "./Components/TodoList/TodoList";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ToastProvider } from "./context/ToastContext";
import TodosProvider from "./context/TodosContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0097a7",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div className="App flex-box">
              <TodoList />     
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
