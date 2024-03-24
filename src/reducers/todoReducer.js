import { v4 as uuidv4 } from "uuid";


export default function reducer(currentTodos, action) {
    switch (action.type) {
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
        default:
            {
                throw new Error("unknown action type " + action.type);
            }
    }
    return []

}