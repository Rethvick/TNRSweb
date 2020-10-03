//import { useStyles } from "./top-bar.style";

import { AppBar, Container, Toolbar, Typography} from "@material-ui/core";

export function TopBar() {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6">TNRS</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
