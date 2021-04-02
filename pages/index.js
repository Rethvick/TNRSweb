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
} from "../actions";
import _ from "lodash";

// TODO: this function does not belong here
// this function groups names that matched the same species
const applyMatchThreshold = (rows, matchingThreshold) => {
  // group data using
  // Author_matched + Name_matched + Overall_score + Accepted_name
  return (
    _.chain(rows)
      // group all records returned for a specific name together
      .groupBy("Name_submitted")
      .map((group) => {
        // count the number of matches above threshold
        let aboveThresholdCount = 0;
        let clearedGroup = group.map((row) => {
          // clear out matches bellow threshold
          if (row["Overall_score"] < matchingThreshold) {
            return {
              ID: row["ID"],
              Name_submitted: row["Name_submitted"],
              Overall_score: "",
              Name_matched_id: "",
              Name_matched: "[No match found]",
              Name_score: "",
              Name_matched_rank: "",
              Author_submitted: row["Author_submitted"],
              Author_matched: "",
              Author_score: "",
              Canonical_author: "",
              Name_matched_accepted_family: "",
              Genus_submitted: row["Genus_submitted"],
              Genus_matched: "",
              Genus_score: "",
              Specific_epithet_submitted: row["Specific_epithet_submitted"],
              Specific_epithet_matched: "",
              Specific_epithet_score: "",
              Family_submitted: row["Family_submitted"],
              Family_matched: "",
              Family_score: "",
              Infraspecific_rank: "",
              Infraspecific_epithet_matched: "",
              Infraspecific_epithet_score: "",
              Infraspecific_rank_2: "",
              Infraspecific_epithet_2_matched: "",
              Infraspecific_epithet_2_score: "",
              Annotations: "",
              Unmatched_terms: "",
              Name_matched_url: "",
              Name_matched_lsid: "",
              Phonetic: "",
              Taxonomic_status: "",
              Accepted_name: "",
              Accepted_species: "",
              Accepted_name_author: "",
              Accepted_name_id: "",
              Accepted_name_rank: "",
              Accepted_name_url: "",
              Accepted_name_lsid: "",
              Accepted_family: "",
              Overall_score_order: "1",
              Highertaxa_score_order: "1",
              Source: "",
              Warnings: "",
              selected: row["selected"],
              unique_id: row["unique_id"],
            };
          }
          // if the record is not bellow threshold increase conunt and return it filled
          aboveThresholdCount = aboveThresholdCount + 1;
          return row;
        });
        // if number of matches above threshold >= 1
        if (aboveThresholdCount >= 1) {
          // remove all records that did not match the threshold
          return clearedGroup.filter(
            (row) => row["Name_matched"] !== "[No match found]"
          );
        } else {
          // else return the single top entry with empty fields
          return clearedGroup[0];
        }
      })
      // flatten to remove groupById
      .flatten()
      .value()
  );
};

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
  const [matchingThreshold, setMatchingThreshold] = useState(0.51);
  const [plantNames, setPlantNames] = useState([]);

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
    // save the plant names to use later
    setPlantNames(names);

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
        setResolvedNames(applyMatchThreshold(res, matchingThreshold));
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
