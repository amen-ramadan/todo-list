import "./App.css";
import TodoList from "./Components/TodoList/TodoList";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TodosContext from "./context/TodosContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import MySnackBar from "./Components/MySnackBar/MySnackBar";
import { ToastContext } from "./context/ToastContext";

const initialTodos = [
  {
    id: uuidv4(),
    title: "read a book",
    details: "book a7san mn book wa7ed",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "read a book2",
    details: "book a7san mn book wa7ed",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "read a book3",
    details: "book a7san mn book wa7ed",
    isCompleted: false,
  },
];
const theme = createTheme({
  palette: {
    primary: {
      main: "#0097a7",
    },
  },
});

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={{ showHideToast }}>
        <div className="App flex-box">
          <MySnackBar open={open} message={message} />
          <TodosContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodosContext.Provider>
        </div>
      </ToastContext.Provider>
    </ThemeProvider>
  );
}

export default App;
