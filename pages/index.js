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
  const [result, setResult] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [resdata, setResdata] = useState([]);

  const queryNames = (names) => {
    const query = names.split("\n").map((v, i) => [i + 1, v]);
    test.data = query;
    //test.data.push(query);
    setJsonInput(JSON.stringify(test));
    setResult("loading");
    axios
      .post("http://localhost:4000/", test, {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (res) => {
          // console.log(res);
          setResult(JSON.stringify(res));
          setResdata(res.data);
          //res.data.map(console.log);
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
                  <ResultTable tableData={resdata} />
                </Grid>
                {/* <Grid lg={12} xs={12} item>
                  <Paper>
                    <Box p={2}>Query: {jsonInput}</Box>
                  </Paper>
                </Grid>
                <Grid lg={12} xs ={12} item>
                  <Paper>
                    <Box p={2}>Result: {JSON.stringify(resdata)}</Box>
                  </Paper>
                </Grid> */}
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
