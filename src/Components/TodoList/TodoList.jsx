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
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import TodosContext from "../../context/TodosContext";

/////////////////////
export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInputAndDetails, setTitleAndDetailsInput] = useState({});

  const todosJsx = todos.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });

  function handelAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInputAndDetails.title,
      details: titleInputAndDetails.details,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);

    // reset the state of the inputs
    setTitleAndDetailsInput({
      title: "",
      details: "",
    });
    setTodos([...todos, newTodo]);
    setTitleAndDetailsInput({
      title: "",
      details: "",
    });
  }

  // component todo
  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5">My Tasks</Typography>
          <Divider sx={{ marginBottom: "7px" }} />
          <ToggleButtonGroup value="left" exclusive>
            <ToggleButton value="left">All</ToggleButton>
            <ToggleButton value="center">Success</ToggleButton>
            <ToggleButton value="right">Unfinished</ToggleButton>
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
                sx={{ background: "#FFC107" }}
                onClick={handelAddClick}
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
