import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// context
import{ useDispatchTodos } from "../../context/TodosContext";
import { useToast } from "../../context/ToastContext";

export default function Todo({ todo, showDelete, showUpdate }) {

  const dispatch  = useDispatchTodos()
  const { showHideToast } = useToast();

  // event handlers 💀💀💀💀

  // pass through the todo id for parent component
  function handleCheckClick() {
    dispatch({type: 'toggleCompleted', payload: todo})
    // show toast
    showHideToast("Modified successfully");
  }

  // update function and close the dialog
  function handleUpdateClick() {
    showUpdate(todo);
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
                onClick={() => {
                  showDelete(todo);
                }}
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
