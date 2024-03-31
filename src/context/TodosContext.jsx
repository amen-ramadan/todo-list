import { createContext, useReducer, useContext } from "react";
import reducer from "../reducers/todoReducer";


export const TodosContext = createContext([]);
export const TodosDispatchContext = createContext(null);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []); 
  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  )
}

export const useTodos= () => {
  return useContext(TodosContext)
}
export const useDispatchTodos= () => {
  return useContext(TodosDispatchContext)
}
export default TodosProvider