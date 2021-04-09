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

// TODO: sortByColumn could have a better name
import {
  sortByColumn,
  requestResolveNames,
  requestParseNames,
  requestSources,
  requestFamilyClassifications,
  applyMatchThreshold,
} from "../actions";
import _ from "lodash";

function IndexApp({ sourcesAvailable, familiesAvailable }) {
  // TODO: having all these states does not seem fun
  // state where we keep the results that come from the API
  const [resolvedNames, setResolvedNames] = useState([]);
  // state where we store the parsed names
  const [parsedNames, setParsedNames] = useState([]);
  // we keep the sources selected by the user here
  const [sourcesQuery, setSourcesQuery] = useState(sourcesAvailable.join(","));
  // use the first family available
  const [familyQuery, setFamilyQuery] = useState(
    familiesAvailable[0].sourceName
  );
  // keep a status for when the system is loading
  const [loadingStatus, setLoadingStatus] = useState(false);
  // resolve or parse
  const [queryType, setQueryType] = useState("resolve");
  //
  const [bestMatchingSetting, setBestMatchingSetting] = useState();
  // this is used to keep track of the submission time
  // when we download the settings
  const [queryTimeTracker, setQueryTime] = useState({ start: null, end: null });
  // keep track of the matching threshold
  const [matchingThreshold, setMatchingThreshold] = useState(0.53);
  // keep the user input to be used later
  const [plantNames, setPlantNames] = useState("");

  // function to query data from the api
  // FIXME: move this function to a separate file
  const queryNames = (names) => {
    // keep names from the search box
    setPlantNames(names);
    // process names
    const queryNames = names
      // break lines
      .split("\n")
      // remove extra white spaces
      .map((name) => name.replace(/\s+/g, " ").trim())
      // remove empty lines
      .filter((f) => f.length > 0)
      // add index starting from 1
      .map((v, i) => [i + 1, v]);
    // save the plant names to use later

    // don't do anything if no names are provided
    if (names.length == 0) {
      return;
    }
    // clear results
    // TODO: rename this to setResolvedNames
    setResolvedNames([]);
    setParsedNames([]);
    // show spinner
    setLoadingStatus(true);
    //
    if (queryType === "resolve") {
      // show spinner
      let start = Date();
      // request the data and set result
      requestResolveNames(queryNames, sourcesQuery, familyQuery).then((res) => {
        setLoadingStatus(false);
        // record start and end time
        setQueryTime({ start: start, end: Date() });
        setBestMatchingSetting("Overall_score_order");
        // add a function to filter results based on score
        console.log(res);
        let threholdFilteredNames = applyMatchThreshold(res, matchingThreshold);
        console.log(threholdFilteredNames);
        setResolvedNames(threholdFilteredNames);
      });
    }

    if (queryType === "parse") {
      requestParseNames(queryNames).then((res) => {
        setLoadingStatus(false);
        setParsedNames(res);
      });
    }
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

  const sortByColumnHandler = (column) => {
    let sortedData = sortByColumn(result, column);
    setBestMatchingSetting(column);
    setResult(sortedData);
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
                    sourcesAvailable={sourcesAvailable}
                    familiesAvailable={familiesAvailable}
                    queryType={queryType}
                    familyQuery={familyQuery}
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

// setting initial props with sources and families
// these are necessary to render the application
IndexApp.getInitialProps = async () => {
  let sources = await requestSources();
  // get only the names
  let sourceNames = sources.map((s) => s.sourceName);
  let families = await requestFamilyClassifications();
  return { sourcesAvailable: sourceNames, familiesAvailable: families };
};

export default IndexApp;
