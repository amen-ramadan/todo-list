import { Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function Todo() {
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
        marginTop: 5,
      }}
    >
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={8}>
            <Typography variant="h5">First task</Typography>
            <Typography variant="caption">
              amen and aatef and ayman and ayman eltany and abo akkar
            </Typography>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <IconButton color="primary" aria-label="mark as done">
              <DoneIcon sx={iconStyles} />
            </IconButton>
            <IconButton color="secondary" aria-label="delete task">
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
