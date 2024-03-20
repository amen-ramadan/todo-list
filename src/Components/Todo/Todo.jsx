import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// import dialogs
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// context
import { useContext, useState } from "react";
import TodosContext from "../../context/TodosContext";

export default function Todo({ todo }) {
  // import context
  const { todos, setTodos } = useContext(TodosContext);

  // state for dialog state change
  const [openDialog, setOpenDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateTodo, setUpdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  // event handlers 💀💀💀💀

  // pass through the todo id for parent component
  function handleCheckClick() {
    const newUpdateTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTodos(newUpdateTodos);
    localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
  }

  // delete function and close the dialog
  function handleDeleteClick() {
    setOpenDialog(true);
  }

  function handleDeleteDialogClose() {
    setOpenDialog(false);
  }

  function handleDeleteConfirm() {
    const newUpdateTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(newUpdateTodos);
    // handleClose(false);
    localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    const newUpdateTodos = todos.map((t) => {
      return todo.id === t.id
        ? { ...t, title: updateTodo.title, details: updateTodo.details }
        : t;
    });
    setTodos(newUpdateTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(newUpdateTodos));
  }
  // ==== event handlers ==== 💀💀💀💀

  const iconStyles = {
    color: "#FFC107",
    background: "#fff",
    border: "1px solid #FFC107",
    borderRadius: "25%",
    padding: "3px",
  };

  return (
    <>
      {/* DELETE DIALOG */}
      <Dialog
        open={openDialog}
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

      <Card
        sx={{
          backgroundColor: "#0097a7",
          color: "#eee",
          minWidth: 275,
          marginTop: 2,
        }}
      >
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={8}>
              <Typography
                variant="h5"
                sx={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="caption">{todo.details}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="right">
              {/* CHECK ICON BUTTON */}
              <IconButton
                color="primary"
                aria-label="mark as done"
                onClick={handleCheckClick}
              >
                <DoneIcon
                  sx={{
                    ...iconStyles,
                    background: todo.isCompleted ? "#FFC107" : "white",
                    color: todo.isCompleted ? "white" : "#FFC107",
                    borderColor: todo.isCompleted ? "white" : "#FFC107",
                  }}
                />
              </IconButton>
              {/*=== CHECK ICON BUTTON ===*/}

              {/* UPDATE BUTTON */}
              <IconButton
                onClick={handleUpdateClick}
                color="secondary"
                aria-label="edit task"
              >
                <EditOutlinedIcon
                  sx={{
                    ...iconStyles,
                    color: "#1769aa",
                    borderColor: "#1769aa",
                  }}
                />
              </IconButton>
              {/*=== UPDATE BUTTON ===*/}

              {/* DELETE BUTTON */}
              <IconButton
                color="secondary"
                aria-label="delete task"
                onClick={handleDeleteClick}
              >
                <DeleteIcon
                  sx={{
                    ...iconStyles,
                    color: "#f44336",
                    borderColor: "#f44336",
                  }}
                />
              </IconButton>
              {/*=== DELETE BUTTON ===*/}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
