import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// context
import { useContext } from "react";
import TodosContext from "../../context/TodosContext";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);

  // pass through the todo id for parent component
  function handleCheckClick() {
    const newUpdateTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTodos(newUpdateTodos);
  }
  const iconStyles = {
    color: "#FFC107",
    background: "#fff",
    border: "1px solid #FFC107",
    borderRadius: "25%",
    padding: "3px",
  };

  return (
    <Card
      sx={{
        backgroundColor: "#304ffe",
        color: "#eee",
        minWidth: 275,
        marginTop: 2,
      }}
    >
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={8}>
            <Typography variant="h5">{todo.title}</Typography>
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

            <IconButton color="secondary" aria-label="edit task">
              <EditOutlinedIcon
                sx={{
                  ...iconStyles,
                  color: "#1769aa",
                  borderColor: "#1769aa",
                }}
              />
            </IconButton>
            <IconButton color="secondary" aria-label="delete task">
              <DeleteIcon
                sx={{
                  ...iconStyles,
                  color: "#f44336",
                  borderColor: "#f44336",
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
