import { useState, useEffect } from "react";

import Head from "next/head";
import axios from "axios";

// importing loadash
import _ from "lodash";

import {
  SearchBox,
  OptionsBox,
  ResultTable,
  Footer,
  TopBar,
  DownloadResults,
  generateDownloadFile,
} from "../components/";

import { Grid, Box, Container, Paper } from "@material-ui/core";

const apiEndPoint = "http://vegbiendev.nceas.ucsb.edu:8975/tnrs_api.php";

function IndexApp({ sourcesAvailable }) {
  // state where we keep the results that come from the API
  const [result, setResult] = useState([]);
  // we keep the sources selected by the user here
  const [sourcesQuery, setSourcesQuery] = useState(sourcesAvailable.join(","));
  // keep a status for when the system is loading
  const [loadingStatus, setLoadingStatus] = useState(false);

  // function to query data from the api
  // FIXME: move this function to a separate file
  const queryNames = (names) => {
    // show spinner
    setLoadingStatus(true);

    // names from the search box
    const queryNames = names
      // break lines
      .split("\n")
      // remove extra white spaces
      .map((name) => name.replace(/\s+/g, " ").trim())
      // remove empty lines
      .filter((f) => f.length > 0)
      // add index starting from 1
      .map((v, i) => [i + 1, v]);

    // don't do anything if no names are provided
    if (names.length == 0) {
      return;
    }

    // query object sent to the api
    const queryObject = {
      opts: {
        // sources coming from the options box
        sources: sourcesQuery,
        class: "tropicos",
        mode: "resolve",
        matches: "all",
      },
      data: [],
    };

    // queryNames coming from the searchbox
    queryObject.data = queryNames;

    // sending the request to the API
    axios
      .post("http://vegbiendev.nceas.ucsb.edu:8975/tnrs_api.php", queryObject, {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (response) => {
          // group data using
          // Author_matched + Name_matched + Overall_score + Accepted_name
          let groupedData = _.chain(response.data)
            //for each ID returned
            .groupBy("ID")
            .map((idGroup) => {
              // group by selected properties
              return (
                _.chain(idGroup)
                  .groupBy((row) => {
                    return (
                      row.Canonical_author +
                      row.Name_matched +
                      row.Overall_score +
                      row.Accepted_name +
                      row.Taxonomic_status +
                      row.Accepted_name +
                      row.Accepted_name_author
                    );
                  })
                  // consolidate Source, Name_matched_url and Accepted_name_url
                  .map((eqRow) => {
                    let head = eqRow[0];
                    let tail = eqRow.slice(1);
                    tail.forEach((row) => {
                      head.Source = head.Source + "," + row.Source;
                      head.Name_matched_url =
                        head.Name_matched_url + ";" + row.Name_matched_url;
                      head.Accepted_name_url =
                        head.Accepted_name_url + ";" + row.Accepted_name_url;
                    });
                    // return only one row per group
                    return head;
                  })
                  .value()
              );
            })
            // flatten to remove groupById
            .flatten()
            .value();
          // use the column 'Overall_score_order' to create the column selected
          let responseSelected = groupedData.map((row, idx) => {
            return {
              ...row,
              ...{ selected: row.Overall_score_order == 1, unique_id: idx },
            };
          });
          // update state
          setResult(responseSelected);
          // hide spinner
          setLoadingStatus(false);
        },
        () => {
          alert("Error fetching data from API");
        }
      );
  };

  // function to generate the download file
  const downloadResultsHandler = (fileName, fileFormat, matchesToDownload) => {
    generateDownloadFile(result, fileName, fileFormat, matchesToDownload);
  };

  const changeSelectedRowHandler = (rowToSelect) => {
    let new_results = result.map((row) => {
      if (row.unique_id == rowToSelect.unique_id) {
        row.selected = true;
        return row;
      } else if (row.ID == rowToSelect.ID) {
        row.selected = false;
        return row;
      } else {
        return row;
      }
    });
    setResult(new_results);
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
                  <SearchBox
                    onSearch={queryNames}
                    loadingStatus={loadingStatus}
                  />
                </Grid>
                <Grid lg={6} xs={12} item>
                  <OptionsBox
                    sourcesAvailable={sourcesAvailable}
                    onChangeSources={(sources) => setSourcesQuery(sources)}
                  />
                </Grid>
                {result.length > 0 && (
                  <Grid lg={12} xs={12} item>
                    <Paper>
                      <Box ml={2} pt={2}>
                        <DownloadResults
                          onClickDownload={downloadResultsHandler}
                        />
                      </Box>
                      <ResultTable
                        tableData={result}
                        onChangeSelectedRow={changeSelectedRowHandler}
                      />
                    </Paper>
                  </Grid>
                )}
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

const loadSources = async () => {
  // query source
  let querySources = {
    opts: {
      mode: "sources",
    },
  };
  // axios
  return await axios
    .post(apiEndPoint, querySources, {
      headers: { "Content-Type": "application/json" },
    })
    .then(
      (response) => {
        // get source names
        let sourceNames = response.data.map((s) => s.sourceName);
        //
        //let sourcesString = sourceNames.join(',')
        return sourceNames;
        //setSources(sourceNames);
      },
      () => {
        alert("There was an error while retrieving the sources");
      }
    );
};

// loading sources
IndexApp.getInitialProps = async () => {
  let sources = await loadSources();
  return { sourcesAvailable: sources };
};

export default IndexApp;
