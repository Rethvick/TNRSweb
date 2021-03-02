import { Layout } from "../components";
import Head from "next/head";

import { Typography, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Link from "next/link";

const apiServer = process.env.apiServer;
const apiEndPoint = process.env.apiEndPoint;

const useStyles = makeStyles((theme) => ({
  page: {
    padding: theme.spacing(0.5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    color: theme.palette.grey[400],
    height: "15px",
  },
  image: {
    padding: theme.spacing(0),
    objectFit: "none",
    flex: 1,
    flexGrow: 1,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  action: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // alignSelf: "center",
    // bottom: 0,
    // flex: 1
  },
}));

function InstructionsApp() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Instructions</title>
        <a rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography variant="h3" align="justify" display="block" gutterBottom>
          How To Use The TNRS
        </Typography>

{/* 
        <Typography variant="h5" align="justify">
          Contents
        </Typography>
        <br />
        <Typography variant="body2" gutterBottom align="justify">
          <a href="#howuse">How do I use the TNRS?</a>
          <br />
        </Typography>
        <br />
*/}
        <div id="howuse">
          <Typography variant="h5" gutterBottom align="justify">
            Follow these steps to use the TNRS:
            <br />
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            <List>
              <ListItem>
                <Typography variant="body2">
                  1. <strong>Enter your names</strong>. Paste your list of names
                  into the "Scientific names to check box", one name per line.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  2. <strong>Choose your settings</strong>. For most users, the
                  default settings are generally best. However, if you only want
                  to parse your names into their component parts, without 
                  matching or resolving, then set 
                  "Processing Mode" to "Perform Name Resolution". 
                  For "Family Classification", option 
                  "Tropicos" uses APG IV families for all matched and accepted
                  names (i.e., the classification used by source "Tropicos"). 
                  "Tropicos" is currently the only available family 
                  classification; however, this may change in the future. 
                  By default, setting "Sources" includes all available taxonomic 
                  sources. However, some
                  users may prefer or be required to use only a single taxonomic
                  source. For example, government users in the U.S.A. may be
                  required to resolve species names using USDA Plants taxonomy
                  only (source "USDA").
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  3. <strong>Submit!</strong> Process your names by pressing the
                  Submit button.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  4. <strong>Inspect</strong>. Always inspect your results
                  before downloading if (a) any <a href="/warnings">warnings</a>{" "}
                  are displayed in the first column of the results table (click
                  on the <a href="/warnings">warning</a> symbol for details), or
                  (b) the TNRS found >1 match to a name. The latter will be
                  indicated by the hyperlinked text "(+n more)" after the name
                  in column "Name Matched". Use the provided links to research
                  all potential matches, selecting an alternative match as the
                  best name if appropropriate. If a{" "}
                  <a href="/warnings">warning</a> indicates that a better higher
                  taxonomic match is available for a submitted name, you should
                  inspect the alternative very carefully, as this may indicate
                  that a better matching genus or family is correct, but the
                  specific epithet was fuzzy matched to an unrelated taxon in a
                  different genus or family.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  5. <strong>Adjust best match algorithm (if desired)</strong>.
                  You can adjust the Best Match algorithm on the fly by clicking
                  on the "Best Match Settings" control and selecting "Sort by
                  Higher Taxonomy" instead of the default "Sort by Overall
                  Score". However, in most cases you should instead inspect and
                  change names individually, as changing "Best Match Settings"
                  will discard any manual selections you have made. However, if
                  many names have the <a href="/warnings">warning</a> "Better
                  higher taxonomic match available", you may find it helpful to
                  download your names twice and compare the results: once using
                  the default "Sort by Overall Score" method, and a second time
                  using "Sort by Higher Taxonomy".
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  6. <strong>Download data</strong>. 
                  After you have inspected your
                  results and made changes, if any, you can download your
                  results by clicking on the "Download Data" control. You will
                  be given the option to download your file as comma-delimitted
                  or tab-delimitted, and can choose between download all matches
                  or the best match only for each name.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  7. <strong>Download metadata</strong>. 
                  Use the "Download settings" button to download a summary
                  of the settings, source, & application versions used to 
                  process your names. We recommend you include this 
                  information in your publication, as the same names processed
                  using different settings, versions or sources may
                  be resolved differently. Reporting this information
                  is important for repeatability of research results. 
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  8. <strong>Cite your sources</strong>. 
                  Please cite the TNRS and all taxonomic sources used
                  in any publication which includes taxonomic names resolved
                  using the TNRS. See <a href="/cite">Cite</a>{" "}for details.
                </Typography>
              </ListItem>
            </List>
          </Typography>
        </div>
      </Layout>
    </>
  );
}

export default InstructionsApp;
