import {
  Container,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";

//component
import Todo from "../Todo/Todo";
// others
import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodosContext from "../../context/TodosContext";

/////////////////////
export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const [titleInputAndDetails, setTitleAndDetailsInput] = useState({
    title: "",
    details: "",
  });

  // filtration arrays
  const completedTodos = todos.filter((todo) => {
    return todo.isCompleted;
  });
  // filtration arrays
  const notCompletedTodos = todos.filter((todo) => {
    return !todo.isCompleted;
  });

  // handle the nav links if has a completed or not completed or all
  let todosToBeRendered = todos;
  if (displayTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType == "non-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  // the Todos viewer
  const todosJsx = todosToBeRendered.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  // call useEffect
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function handelAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInputAndDetails.title,
      details: titleInputAndDetails.details,
      isCompleted: false,
    };

    // reset the state of the inputs, when you add a new itemTodo
    setTitleAndDetailsInput({
      title: "",
      details: "",
    });
    setTodos([...todos, newTodo]);
    setTitleAndDetailsInput({
      title: "",
      details: "",
    });

    // قمنا بتحديث ال state بهذه الطريقة حتى نتفادى مشكلة التحديث المتكرر لل state
    const newUpdateTodos = [...todos, newTodo];
    setTodos(newUpdateTodos);

    // add item to the local storage
    localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
  }

  function changeDisplayType(e) {
    console.log(e.target.value);
    setDisplayTodosType(e.target.value);
  }
  // component todo
  return (
    <Container maxWidth="sm">
      <Card style={{ maxHeight: "80vh", overflow: "scroll" }}>
        <CardContent>
          <Typography variant="h5">My Tasks</Typography>
          <Divider sx={{ marginBottom: "7px" }} />
          <ToggleButtonGroup
            value={displayTodosType}
            exclusive
            onChange={changeDisplayType}
            color="primary"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="completed">Success</ToggleButton>
            <ToggleButton value="non-completed">Not Completed</ToggleButton>
          </ToggleButtonGroup>
          {/* components todo */}
          {todosJsx}

          {/*=== components todo ===*/}

          {/* input add todo */}
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "5px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Task title"
                variant="outlined"
                sx={{ width: "100%", marginBottom: "10px" }}
                value={titleInputAndDetails.title}
                onChange={(e) => {
                  setTitleAndDetailsInput({
                    ...titleInputAndDetails,
                    title: e.target.value,
                  });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Task details"
                variant="outlined"
                sx={{ width: "100%" }}
                value={titleInputAndDetails.details}
                onChange={(e) => {
                  setTitleAndDetailsInput({
                    ...titleInputAndDetails,
                    details: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                sx={{ background: "primary" }}
                onClick={handelAddClick}
                disabled={titleInputAndDetails.title.length == 0}
              >
                Add a task
              </Button>
            </Grid>
          </Grid>
          {/*=== input add todo ===*/}
        </CardContent>
      </Card>
    </Container>
  );
}
