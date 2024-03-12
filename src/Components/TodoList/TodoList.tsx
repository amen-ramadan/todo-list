import {
  Container,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Todo from "../Todo/Todo";

export default function TodoList() {
  return (
    <Container maxWidth="sm">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            My Tasks
          </Typography>
          <Divider />
          <ToggleButtonGroup value="left" exclusive sx={{ marginTop: 2 }}>
            <ToggleButton value="left">All</ToggleButton>
            <ToggleButton value="center">Success</ToggleButton>
            <ToggleButton value="right">Unfinished</ToggleButton>
          </ToggleButtonGroup>
          <Todo />
        </CardContent>
      </Card>
    </Container>
  );
}
