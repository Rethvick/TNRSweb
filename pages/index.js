import { useState, useEffect } from "react";
import Head from "next/head";
import { Grid, Box, Container, Paper } from "@material-ui/core";
import {
  SearchBox,
  OptionsBox,
  ResolveTable,
  Footer,
  TopBar,
  DownloadResolvedResults,
  DownloadParsedResults,
  ParseTable,
  BestMatchSettingsPopper,
  MatchThresholdPopper,
  DownloadSettings,
} from "../components/";

import {
  sortByColumn,
  requestResolveNames,
  requestParseNames,
  applyMatchThreshold,
} from "../actions";

import _ from "lodash";

const splitNames = (names) => {
  return names
    // break lines
    .split("\n")
    // remove extra white spaces
    .map((name) => name.replace(/\s+/g, " ").trim())
    // remove empty lines
    .filter((f) => f.length > 0)
    // add index starting from 1
    .map((v, i) => [i + 1, v]);
  // save the plant names to use later
}

function IndexApp() {
  // state where we keep the results that come from the API
  const [resolvedNames, setResolvedNames] = useState([]);
  // state where we store the parsed names
  const [parsedNames, setParsedNames] = useState([]);

  // we keep the sources selected by the user here
  const [sourcesQuery, setSourcesQuery] = useState("");
  // use the first family available
  const [familyQuery, setFamilyQuery] = useState("");

  // keep a status for when the system is loading
  const [loadingStatus, setLoadingStatus] = useState(false);

  // query options
  const [queryType, setQueryType] = useState("resolve");
  const [bestMatchingSetting, setBestMatchingSetting] = useState();
  const [queryTimeTracker, setQueryTime] = useState({ start: null, end: null });
  const [matchingThreshold, setMatchingThreshold] = useState(
    process.env.defaultMatchingThreshold
  );

  // keep the user input to be used later
  const [plantNames, setPlantNames] = useState("");

  // function to query data from the api
  const queryNames = (names) => {
    // keep names from the search box
    setPlantNames(names);

    // process names
    const queryNamesStr = splitNames(names)

    // don't do anything if no names are provided
    if (names.length == 0) {
      return;
    }

    // clear results
    setResolvedNames([]);
    setParsedNames([]);
    // show spinner
    setLoadingStatus(true);


    // if the user wants to resolve the names
    if (queryType === "resolve") {
      // show spinner
      let start = Date();
      // request the data and set result
      requestResolveNames(queryNamesStr, sourcesQuery, familyQuery).then(
        (res) => {
          setLoadingStatus(false);
          // record start and end time
          setQueryTime({ start: start, end: Date() });
          setBestMatchingSetting("Overall_score_order");
          // add a function to filter results based on score
          let threholdFilteredNames = applyMatchThreshold(
            res,
            matchingThreshold
          );
          setResolvedNames(threholdFilteredNames);
        }
      );
    }

    // if the user wants to parse the names
    if (queryType === "parse") {
      requestParseNames(queryNamesStr).then((response) => {
        setLoadingStatus(false);
        setParsedNames(response);
      });
    }
  };

  // when the user opens the dialog with multiple
  // if the user selects a different row,
  // this function will add true to that particular row
  const changeSelectedRowHandler = (rowToSelect) => {
    let new_results = resolvedNames.map((row) => {
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
    setResolvedNames(new_results);
  };

  // if the user decides to use a different column
  // to sort results, such as Higher_taxa_score_order
  const sortByColumnHandler = (column) => {
    let sortedData = sortByColumn(resolvedNames, column);
    setBestMatchingSetting(column);
    setResolvedNames(sortedData);
  };

  //  if matching threshold changes, re-do the query
  useEffect(() => {
    queryNames(plantNames);
  }, [matchingThreshold]);

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
                    onChangeFamily={(family) => setFamilyQuery(family)}
                    onChangeSources={(sources) => setSourcesQuery(sources)}
                  />
                </Grid>
                {resolvedNames.length > 0 && (
                  <Grid lg={12} xs={12} item>
                    <Paper>
                      <Box ml={2} pt={2} display="flex">
                        <BestMatchSettingsPopper
                          bestMatchingSetting={bestMatchingSetting}
                          onClickSort={sortByColumnHandler}
                        />
                        <MatchThresholdPopper
                          onChangeMatchingThreshold={(mt) => {
                            // reapply the matching threshold
                            setMatchingThreshold(mt);
                          }}
                          matchingThreshold={matchingThreshold}
                        />
                        <DownloadResolvedResults data={resolvedNames} />
                        <DownloadSettings
                          settings={{
                            time: queryTimeTracker,
                            higherTaxonomy:
                              bestMatchingSetting == "Highertaxa_score_order",
                            familyClassification: familyQuery,
                            sourcesSelected: sourcesQuery,
                            jobType: queryType,
                            matchingThreshold: matchingThreshold,
                          }}
                        />
                      </Box>
                      <Box pb={1}>
                        <ResolveTable
                          tableData={resolvedNames}
                          onChangeSelectedRow={changeSelectedRowHandler}
                        />
                      </Box>
                    </Paper>
                  </Grid>
                )}
                {parsedNames.length > 0 && (
                  <Grid lg={12} xs={12} item>
                    <Paper>
                      <Box ml={2} pt={2} display="flex">
                        <DownloadParsedResults data={parsedNames} />
                      </Box>
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

export default IndexApp;
