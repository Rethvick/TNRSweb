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

  const menuLinks = [
    { href: '/', name: 'Home' },
    { href: '/about', name: 'About' },
    { href: '/instructions', name: 'Instructions' },
    { href: '/tnrsapi', name: 'API' },
    { href: '/cite', name: 'Cite' },
    { href: '/data-dictionary', name: 'Data Dictionary' }
  ]

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
            <LowResMenu menuLinks={menuLinks} />
          </Hidden>
          <Hidden smDown>
            <Typography variant="overline" className={classes.title}>
              Taxonomic Name Resolution Service v{appVersion}
            </Typography>

            {menuLinks.map((item, k) =>
              <Link href={item.href} key={k} passHref>
                <Button component="a" color="inherit">
                  {item.name}
                </Button>
              </Link>
            )}

          </Hidden>
        </Toolbar>
      </Container>
    </AppBar >
  );
}

