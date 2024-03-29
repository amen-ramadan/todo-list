import { createContext, useReducer, useContext } from "react";
import reducer from "../reducers/todoReducer";



export const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatchTodos] = useReducer(reducer, []); 
  return (
    <TodosContext.Provider value={{todos: todos, dispatch: dispatchTodos}}>
      {children}
    </TodosContext.Provider>
  )
}

export const useTodos= () => {
  return useContext(TodosContext)
}
export default TodosProvider