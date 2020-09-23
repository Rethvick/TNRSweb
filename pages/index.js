import { useState } from "react";

import Head from "next/head";
import axios from "axios";

import { SearchBox, OptionsBox, ResultTable } from "../components/";

import {
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Link,
} from "@material-ui/core";

const test = {
  opts: {
    sources: "tropicos,tpl,usda",
    class: "tropicos",
    mode: "resolve",
    matches: "best",
  },
  data: [],
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        TNRS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

export default function Test() {
  const [result, setResult] = useState("");
  const [jsonInput, setJsonInput] = useState("");

  const queryNames = (names) => {
    const query = names.split("\n").map((v, i) => [v, i + 1]);
    test.data = query;
    //test.data.push(query);
    setJsonInput(JSON.stringify(test));
    setResult("loading");
    axios
      .post("http://vegbiendev.nceas.ucsb.edu:8975/tnrs_api.php", test, {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (res) => {
          console.log(res);
          setResult(JSON.stringify(res));
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
                  <ResultTable tableData={result} />
                </Grid>
                <Grid lg={12} xs={12} item>
                  <Paper>
                    <Box p={2}>Query: {jsonInput}</Box>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        </Box>
        <Box>
          <footer>
            <Box py={10} bgcolor="gray">
              <Container>
                <Copyright />
              </Container>
            </Box>
          </footer>
        </Box>
      </Box>
    </>
  );
}
