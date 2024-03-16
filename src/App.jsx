import "./App.css";
import TodoList from "./Components/TodoList/TodoList";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TodosContext from "./context/TodosContext";

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
function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <div className="App flex-box">
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
