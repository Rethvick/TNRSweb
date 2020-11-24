import { useState } from "react";

import Head from "next/head";
import axios from "axios";

// importing loadash
import _ from "lodash";

import {
  SearchBox,
  OptionsBox,
  ResolveTable,
  Footer,
  TopBar,
  DownloadResults,
  generateDownloadFile,
  ParseTable,
  BestMatchSettingsPopper,
} from "../components/";

import { translateWarningCode, sortByHigherTaxonomy } from "../src/actions";

import { Grid, Box, Container, Paper } from "@material-ui/core";

const apiEndPoint = "http://vegbiendev.nceas.ucsb.edu:8975/tnrs_api.php";
//const apiEndPoint = "http://localhost:8080/";

function IndexApp({ sourcesAvailable }) {
  // state where we keep the results that come from the API
  const [result, setResult] = useState([]);
  // state where we store the parsed names
  const [parsedNames, setParsedNames] = useState([]);
  // we keep the sources selected by the user here
  const [sourcesQuery, setSourcesQuery] = useState(sourcesAvailable.join(","));
  // keep a status for when the system is loading
  const [loadingStatus, setLoadingStatus] = useState(false);
  // resolve or parse
  const [queryType, setQueryType] = useState("resolve");
  //
  const [bestMatchingSetting, setBestMatchingSetting] = useState(
    "overall-score"
  );

  // function to query data from the api
  // FIXME: move this function to a separate file
  const queryNames = (names) => {
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
    //
    setResult([]);
    setParsedNames([]);
    // show spinner
    setLoadingStatus(true);
    //
    if (queryType === "resolve") {
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
        .post(apiEndPoint, queryObject, {
          headers: { "Content-Type": "application/json" },
        })
        .then(
          (response) => {
            console.log(response.data)
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
                      let sources = [];
                      let accepted_urls = [];
                      let matched_urls = [];
                      //
                      let head = eqRow[0];
                      //let tail = eqRow.slice(1);
                      eqRow.forEach((row) => {
                        //
                        if (sources.includes(row.Source) === false) {
                          sources.push(row.Source);
                          matched_urls.push(row.Name_matched_url);
                          accepted_urls.push(row.Accepted_name_url);
                        }
                      });
                      //
                      head.Source = sources.join(",");
                      head.Name_matched_url = matched_urls.join(";");
                      head.Accepted_name_url = accepted_urls.join(";");
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
              row.Warnings = translateWarningCode(row.Warnings);
              return {
                ...row,
                ...{ selected: row.Overall_score_order == 1, unique_id: idx },
              };
            });
            // update state
            setResult(responseSelected);
            // hide spinner
            setLoadingStatus(false);
            // reset best matching settings
            setBestMatchingSetting("overall-score");
          },
          () => {
            alert("Error fetching data from API");
          }
        );
    }

    if (queryType === "parse") {
      const parseObject = {
        opts: {
          mode: "parse",
        },
        data: [],
      };

      // queryNames coming from the searchbox
      parseObject.data = queryNames;
      axios
        .post(apiEndPoint, parseObject, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setParsedNames(response.data);
        });
      setLoadingStatus(false);
    }
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
    setBestMatchingSetting("custom");
    setResult(new_results);
  };

  const sortByHigherTaxonomyHandler = () => {
    let sortedData = sortByHigherTaxonomy(result);
    setBestMatchingSetting("higher-taxonomy-order");
    setResult(sortedData);
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
                    queryType={queryType}
                    onChangeQueryType={(queryType) => setQueryType(queryType)}
                    sourcesAvailable={sourcesAvailable}
                    onChangeSources={(sources) => setSourcesQuery(sources)}
                  />
                </Grid>
                {result.length > 0 && (
                  <Grid lg={12} xs={12} item>
                    <Paper>
                      <Box ml={2} pt={2} display="flex">
                        <BestMatchSettingsPopper
                          bestMatchingSetting={bestMatchingSetting}
                          onClickSortHigherTaxa={sortByHigherTaxonomyHandler}
                        />
                        <DownloadResults
                          onClickDownload={downloadResultsHandler}
                        />
                      </Box>
                      <Box pb={1}>
                        <ResolveTable
                          tableData={result}
                          onChangeSelectedRow={changeSelectedRowHandler}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                )}
                {parsedNames.length > 0 && (
                  <Grid lg={12} xs={12} item>
                    <Paper>
                      <Box pb={1}>
                        <ParseTable tableData={parsedNames} />
                      </Box>
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
