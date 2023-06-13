import { useState, useEffect } from "react";
import Link from "next/link";

import { LowResMenu } from "./low-res";
import { useStyles } from "./styles";
import { requestMeta } from "../../actions";

import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Hidden,
} from "@material-ui/core";


export function TopBar() {
  const classes = useStyles();

  //
  const [appVersion, setAppVersion] = useState([]);
  // retrieve the version information
  useEffect(() => {
    async function fetchData() {
      let meta = await requestMeta();
      setAppVersion(meta.app_version)
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

