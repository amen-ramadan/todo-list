import { v4 as uuidv4 } from "uuid";


export default function reducer(currentTodos, action) {
    switch (action.type) {
        case 'toggleCompleted': 
            {
                const newUpdateTodos = currentTodos.map((t) => {
                    if (t.id === action.payload.id) {
                      return { ...t, isCompleted: !t.isCompleted };
                    }
                    return t;
                  });
                  localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
                  return newUpdateTodos;
            }
        case "added":
            {
                const newTodo = {
                    id: uuidv4(),
                    title: action.payload.title,
                    details: action.payload.details,
                    isCompleted: false,
                };

                // قمنا بتحديث ال state بهذه الطريقة حتى نتفادى مشكلة التحديث المتكرر لل state
                const newUpdateTodos = [...currentTodos, newTodo];

                // add item to the local storage
                localStorage.setItem("todos", JSON.stringify(newUpdateTodos));


                return newUpdateTodos;
            }
        case 'deleted':
            {
                const newUpdateTodos = currentTodos.filter((t) => t.id !== action.payload.id);
                localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
                return newUpdateTodos
            }

        case 'updated':
            {
                const newUpdateTodos = currentTodos.map((t) => {
                    return action.payload.id === t.id ? {...t, title: action.payload.title, details: action.payload.details } :
                        t;
                });
                localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
                return newUpdateTodos

            }
        case 'get':
            {
                const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
                return storageTodos;
            }
        default:
            {
                throw new Error("unknown action type " + action.type);
            }
    }
    return []

}