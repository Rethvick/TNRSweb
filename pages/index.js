import { useState } from "react";

import Head from "next/head";
import axios from "axios";

import { SearchBox, OptionsBox, ResultTable, Footer } from "../components/";

import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button
} from "@material-ui/core";

const test = {
  opts: {
    sources: "tropicos,tpl,usda",
    class: "tropicos",
    mode: "resolve",
    matches: "all",
  },
  data: [],
};

const Menu = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6">TNRS</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default function IndexApp() {
  const [result, setResult] = useState([]);

  const queryNames = (names) => {
    const query = names.split("\n").map((v, i) => [i + 1, v]);
    test.data = query;
    axios
      .post("http://localhost:4000/", test, {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (response) => {
          setResult(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <>
      <Head>
        <title>TNRS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box>
          <Menu />
        </Box>
        <Box flexGrow={1} my={2}>
          <main>
            <Container maxWidth="lg">
              <Grid
                spacing={2}
                direction="row"
                justify="center"
                alignItems="stretch"
                container
              >
                <Grid lg={6} xs={12} item>
                  <SearchBox onSearch={queryNames} />
                </Grid>
                <Grid lg={6} xs={12} item>
                  <OptionsBox />
                </Grid>
                <Grid lg={12} xs={12} item>
                  <Box>
                    <Button variant='outlined'  color='secondary'>
                      Download Settings
                    </Button>
                    <Button variant='outlined'  color='primary'>
                      Download Data
                    </Button>
                  </Box>
                  <ResultTable tableData={result} />
                </Grid>
              </Grid>
            </Container>
          </main>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
