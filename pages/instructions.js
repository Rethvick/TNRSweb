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

        <Typography variant="h5" align="justify">
          Contents
        </Typography>
        <br />
        <Typography variant="body2" gutterBottom align="justify">
          <a href="#howwork">How does the TNRS work?</a>
          <br />
        </Typography>
        <Typography variant="body2" gutterBottom align="justify">
          <a href="#howuse">How do I use the TNRS?</a>
          <br />
        </Typography>
        <br />

        <div id="howwork">
          <Typography variant="h5" gutterBottom align="justify">
            How does the TNRS work?
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            The TNRS attempts to match each name submitted to a published
            scientific name in the TNRS database, correcting spelling if
            necessary. Once matched, any synonyms are converted to the correct
            (accepted) name. Both the matched name and the accepted name are
            returned by the TNRS. This process is performed in the following
            steps:
            <br />
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            <List>
              <ListItem>
                <Typography variant="body2">
                  1. <strong>Parse</strong>. The TNRS first parses (splits) the
                  name into its components parts. Components of a species name
                  include genus, specific epithet, and authority, if included.
                  If the name is a subspecies or variety, the parser will also
                  separate the rank indicator ("var.", "subsp.", "sbsp.", etc.)
                  and the subspecific epithet. The parser also detects and
                  separates standard botanical annotations such as "sp. nov."
                  (new species) and "ined." (unpublished name) as well as
                  indicators of uncertainty such as "cf." ("compare with") and
                  "aff." (affinis, related to but not the same). Finally, any
                  unrecognized components are saved as "Unmatched_Terms".
                  Separating "contaminants" from standard components increases
                  the chance that the TNRS will match the intended name. Parsing
                  is performed by the{" "}
                  <a href="http://gni.globalnames.org/" target="_blank">
                    Global Names
                  </a>{" "}
                  <a
                    href="https://github.com/GlobalNamesArchitecture/biodiversity"
                    target="_blank"
                  >
                    Biodiversity Name Parser
                  </a>
                  .
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  2. <strong>Match</strong>. The parsed name components are
                  again matched against known scientific names in the TNRS
                  database. The TNRS attempts both exact matching and fuzzy
                  matching using the{" "}
                  <a
                    href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0107510"
                    target="_blank"
                  >
                    Taxamatch
                  </a>{" "}
                  taxonomic fuzzy matching algorithm. The Taxamatch algorithm
                  speeds up fuzzy matching by searching within the taxonomic
                  hierarchy. For example, once a genus has been identified, only
                  species within that genus are searched.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  3. <strong>Correct</strong>. Once the TNRS has discovered the
                  most likely intended scientific name, it will then examine the
                  taxonomic status of that name. If the name is an outdated
                  synonym of another name, the TNRS will return the "Accepted"
                  (correct) name along with matched name, according to the
                  taxonomic sources selected by the user. For some erroneous
                  names, the TNRS will return only the matched name but no
                  accepted name. This can happen is the accepted name is missing
                  or unknown in the selected taxonomic database, or if the name
                  matched is nomenclaturally invalid (e.g., "Invalid",
                  "Illegitimate"), in which case an accepted name may not exist.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  3. <strong>Select Best Match</strong>. Different sources can
                  sometimes return different names as the single correct
                  (accepted) name. Even if you are using only one taxonomic
                  source, a submitted name can sometimes fuzzy match to multiple
                  names with exactly the same match score. In such cases, the
                  TNRS uses a conservative "Best Match Algorithm" to sort the
                  names in descending order of match quality, preferring, for
                  example, synonyms which have been corrected to a different
                  accepted name over the same name labelled as accepted. After
                  applying these rules, the TNRS marks the top-ranked name as
                  the single best match. In such cases, the TNRS will alert you
                  that multiple matches were found, allowing you to select an
                  alternative match if preferred. We recommend that users
                  examine all alternative matches rather than accepting
                  uncritically the TNRS's choice of "Best Match".
                </Typography>
              </ListItem>
            </List>
            These steps are illustrated in the figure below:
            <br />
            <img src="spellingCorrection.png" />
          </Typography>
        </div>

        <div id="howuse">
          <Typography variant="h5" gutterBottom align="justify">
            How do I use the TNRS?
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
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
                  default settings are generally best. However, if you only wish
                  to break your names into their components, as detected by the
                  Name Parse, then choose "Perform Name Resolution" under
                  setting "Processing Mode". For "Family Classification",
                  "Tropicos" uses APG III families for all matched and accepted
                  names. Although Tropicos is currently the only available
                  option, this may change in the future. For "Sources", some
                  users may prefer or be required to use only a single taxonomic
                  source. For example, government users in the U.S.A. may be
                  required to resolve species names using USDA PLants taxonomy
                  only.
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
                  5. <strong>Download</strong>. After you have inspected your
                  results and made changes, if any, you can download your
                  results by clicking on the "Download Data" control. You will
                  be given the option to download your file as comma-delimitted
                  or tab-delimitted, and can choose between download all matches
                  or the best match only for each name.
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
