import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Hidden,
  Menu,
  MenuItem,
  IconButton,
  Link as MUILink,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import { requestMeta } from "../../actions";

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
  homeLink: {
    textDecoration: "none !important",
  },
  menuButton: {
    marginRight: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  container: {
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0),
    },
  },
}));

export function TopBar() {
  const classes = useStyles();

  //
  const [appVersion, setAppVersion] = useState([]);
  // retrieve the version information
  useEffect(() => {
    async function fetchData() {
      let meta = await requestMeta();
      setAppVersion(meta.code_version)
    }
    fetchData();
  }, []);


  return (
    <AppBar position="static">
      <Container className={classes.container}>
        <Toolbar>
          <Box mr={2}>
            <img src='/logo_highres.png' height='40px'></img>
          </Box>
          <Box mr={1}>
            <Link href="/" passHref>
              <Typography
                className={classes.homeLink}
                component="a"
                color="inherit"
                variant="h6"
              >
                TNRS
              </Typography>
            </Link>
          </Box>
          <Box flexGrow={1} />
          <Hidden mdUp>
            <LowResMenu />
          </Hidden>
          <Hidden smDown>
            <Typography variant="overline" className={classes.title}>
              Taxonomic Name Resolution Service v{appVersion}
            </Typography>
            <Link href="/" passHref>
              <Button component="a" color="inherit">
                Home
              </Button>
            </Link>
            <Link href="/about" passHref>
              <Button size="small" component="a" color="inherit">
                About
              </Button>
            </Link>
            <Link href="/instructions" passHref>
              <Button size="small" component="a" color="inherit">
                Instructions
              </Button>
            </Link>
            <Link href="/tnrsapi" passHref>
              <Button size="small" component="a" color="inherit">
                Api
              </Button>
            </Link>
            <Link href="/sources" passHref>
              <Button size="small" component="a" color="inherit">
                Sources
              </Button>
            </Link>
            <Link href="/cite" passHref>
              <Button size="small" component="a" color="inherit">
                Cite
              </Button>
            </Link>
            <Link href="/contribute" passHref>
              <Button size="small" component="a" color="inherit">
                Contribute
              </Button>
            </Link>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export function LowResMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className={classes.menuButton}
        onClick={handleClick}
        component="a"
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={MUILink} href="/about">
          About
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={MUILink}
          href="/instructions"
        >
          Instructions
        </MenuItem>
        <MenuItem onClick={handleClose} component={MUILink} href="/tnrsapi">
          Api
        </MenuItem>
        <MenuItem onClick={handleClose} component={MUILink} href="/sources">
          Sources
        </MenuItem>
        <MenuItem onClick={handleClose} component={MUILink} href="/cite">
          Cite
        </MenuItem>
        <MenuItem onClick={handleClose} component={MUILink} href="/contribute">
          Contribute
        </MenuItem>
      </Menu>
    </div>
  );
}
