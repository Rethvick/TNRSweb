//import { useStyles } from "./top-bar.style";

import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function TopBar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>TNRS</Typography>
            <Button color="inherit" href="/">
              Home
            </Button>
            <Button color="inherit" href="/sources">
              Sources
            </Button>
            <Button color="inherit" href="/about">
              About
            </Button>
            <Button color="inherit" href="/warnings">
              Warnings
            </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
