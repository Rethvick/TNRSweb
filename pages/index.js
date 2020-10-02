import { useState } from "react";

import Head from "next/head";
import axios from "axios";
import { parse } from 'json2csv';

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

const downloadData = (data) => {
  // TODO: add the entire list of columns
  console.log(data)
  // TODO ID should be renamed to 'Name_number'
  const fields = ['ID', 'Name_submitted', 'Overall_score', 'Name_matched']
  const opts = {fields}
  // convert data to CSV
  try {
    const csv = parse(data, opts);
    console.log(csv)
  } catch(error) {
    // TODO: think about what to do in case of errors
    // for now, logging the error to the console
    console.error(error)
  }
}

// TODO: move this to a separate component
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
                    <Button variant='outlined'  color='primary' onClick={() => downloadData(result)}>
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
