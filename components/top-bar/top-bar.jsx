//import { useStyles } from "./top-bar.style";

import Link from "next/link";

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
          <Box mr={1}>
            <Link href="/" passHref>
              <Typography component="a" color="inherit" variant="h6">
                TNRS
              </Typography>
            </Link>
          </Box>
          <Typography variant="overline" className={classes.title}>
            Alpha
          </Typography>
          <Link href="/" passHref>
            <Button component="a" color="inherit">
              Home
            </Button>
          </Link>
          <Link href="/sources" passHref>
            <Button component="a" color="inherit">
              Sources
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button component="a" color="inherit">
              About
            </Button>
          </Link>
          <Link href="/warnings" passHref>
            <Button component="a" color="inherit">
              Warnings
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
