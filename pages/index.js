import { useState } from "react";

import Head from "next/head";
import axios from "axios";

import {
  SearchBox,
  OptionsBox,
  ResultTable,
  Footer,
  TopBar,
  DownloadResults,
  generateDownloadFile,
} from "../components/";

import { Grid, Box, Container } from "@material-ui/core";

const test = {
  opts: {
    sources: "tropicos,tpl,usda",
    class: "tropicos",
    mode: "resolve",
    matches: "all",
  },
  data: [],
};

export default function IndexApp() {
  // state where we keep the results that come from the API
  const [result, setResult] = useState([]);
  // function to query data from the api
  // TODO: move this somewhere else
  const queryNames = (names) => {
    const query = names.split("\n").map((v, i) => [i + 1, v]);
    test.data = query;
    axios
      .post("http://vegbiendev.nceas.ucsb.edu:8975/tnrs_api.php", test, {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (response) => {
          // use the column 'Overall_score_order' to create the column selected
          let response_selected = response.data.map(
            (row) => {return {...row, ...{'selected' : row.Overall_score_order==1}}}
          )
          // 
          setResult(response_selected);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  ///
  const downloadResultsHandler = (fileName, fileFormat) => {
    generateDownloadFile(result, fileName, fileFormat);
  };
  //
  return (
    <>
      <Head>
        <title>TNRS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box>
          <TopBar />
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
                    <DownloadResults onClickDownload={downloadResultsHandler} />
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
