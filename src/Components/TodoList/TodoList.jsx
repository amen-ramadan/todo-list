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
import { useState, useContext, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import TodosContext from "../../context/TodosContext";

// import dialogs
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/////////////////////
export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [displayTodosType, setDisplayTodosType] = useState("all");
  const [titleInputAndDetails, setTitleAndDetailsInput] = useState({
    title: "",
    details: "",
  });

  // state for todo coming from child component in order to using id to update and delete
  const [dialogTodo, setDialogTodo] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // state for dialog state change
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: dialogTodo ? dialogTodo.title : "",
    details: dialogTodo ? dialogTodo.details : "",
  });

  // filtration arrays
  // and using useMemo from performance
  const completedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return todo.isCompleted;
    });
  }, [todos]);
  // filtration arrays
  // and using useMemo from performance
  const notCompletedTodos = useMemo(() => {
    return todos.filter((todo) => {
      return !todo.isCompleted;
    });
  }, [todos]);

  // handle the nav links if has a completed or not completed or all
  let todosToBeRendered = todos;
  if (displayTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayTodosType == "non-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  // call useEffect in order to git data from local storage
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
    setDisplayTodosType(e.target.value);
  }

  // handlers dialog delete

  // delete function and close the dialog
  function handleDeleteClick(todo) {
    setOpenDeleteDialog(true);
    setDialogTodo(todo);
  }

  function handleDeleteDialogClose() {
    setOpenDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const newUpdateTodos = todos.filter((t) => t.id !== dialogTodo.id);
    setTodos(newUpdateTodos);
    localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
    handleDeleteDialogClose(false);
  }

  // update function and close the dialog
  function handleUpdateClick(todo) {
    setShowUpdateDialog(true);
    setDialogTodo(todo);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    const newUpdateTodos = todos.map((t) => {
      return dialogTodo.id === t.id
        ? { ...t, title: updateTodo.title, details: updateTodo.details }
        : t;
    });
    setTodos(newUpdateTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
  }

  // the Todos jsx viewer
  const todosJsx = todosToBeRendered.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        showDelete={handleDeleteClick}
        showUpdate={handleUpdateClick}
      />
    );
  });
  // component todo
  return (
    <>
      {/* DELETE DIALOG */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo the deletion after it is complete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Disagree</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== DELETE DIALOG ===*/}

      {/* UPDATE DIALOG */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit the assignment "}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="title task name"
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="details"
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={(e) => {
              setUpdateTodo({ ...updateTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Disagree</Button>
          <Button onClick={handleUpdateConfirm} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== UPDATE DIALOG ===*/}

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
    </>
  );
}
