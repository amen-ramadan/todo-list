import "./App.css";
import TodoList from "./Components/TodoList/TodoList";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TodosContext from "./context/TodosContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import MySnackBar from "./Components/MySnackBar/MySnackBar";

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
  const [open, setOpen] = useState(true);

  function showHideToast() {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App flex-box">
        <MySnackBar open={open} />
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
