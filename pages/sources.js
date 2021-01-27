import { Layout } from "../components";
import Head from "next/head";
import { useState } from "react";

import { Typography, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import axios from "axios";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "@material-ui/core/Link";

const Cite = require("citation-js");

const apiServer = process.env.apiServer
const apiEndPoint = process.env.apiEndPoint

const loadSources = async () => {
  const query = {
    opts: {
      mode: "sources",
    },
  };

  return await axios
    .post(apiEndPoint, query, {
      headers: { "Content-Type": "application/json" },
    })
    .then(
      (response) => {
        // setSources(response.data);
        let source_list = response.data;
        return source_list;
      },
      () => {
        alert("There was an error while retrieving the sources");
      }
    );
};

const loadCitations = async () => {
  const query = {
    opts: {
      mode: "citations",
    },
  };

  return await axios
    .post(apiEndPoint, query, {
      headers: { "Content-Type": "application/json" },
    })
    .then(
      (response) => {
        // setSources(response.data);
        let cit_list = response.data;
        return cit_list;
      },
      () => {
        alert("There was an error while retrieving the citations");
      }
    );
};

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
    padding: theme.spacing(2),
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
  },
}));

function BibTexDialog({ displayText }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button component={Link} onClick={handleClickOpen}>
        [bibtex]
      </Button>
      <Dialog
        maxWidth={"md"}
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"BibTeX entry"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {displayText.split("\n").map((line, index) => {
              if ((index > 0) & (line != "}")) {
                line = "\xa0\xa0\xa0\xa0" + line;
              }
              return (
                <span>
                  {line}
                  <br />
                </span>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function SourcesApp({ sourcesAvailable, citationsAvailable }) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>TNRS - Sources</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography
          variant="h3"
          align="justify"
          display="block"
          gutterBottom="True"
        >
          Sources
        </Typography>
        <Typography variant="body2" align="justify" gutterBottom="True">
          The goal of TNRS is to provide the end user the ability to resolve
          their list of names against a number of sources. The team of
          developers at TNRS makes no attempt to determine the authority of the
          names, rather we provide the information that is available from these
          sources in a centralized location for matching of submitted names.
          Should you encounter issues with names that are lacking, please
          contact the source curators directly.
        </Typography>
        <Typography variant="h5" align="justify">
          Table of Contents
        </Typography>
        <Grid item xs={12}>
          <List className="contents">
            <ListItem button component="a" href="#currentsources">
              Current taxonomic sources
            </ListItem>
            <ListItem button component="a" href="#becomingprovider">
              Becoming a data provider
            </ListItem>
            <ListItem button component="a" href="#whoshouldjoin">
              Who should become a data provider for the TNRS?
            </ListItem>
            <ListItem button component="a" href="#howtoshare">
              How do I share my taxonomy?
            </ListItem>
            <ListItem button component="a" href="#exportformat">
              TNRS Simple Darwin Core export format
            </ListItem>
            <ListItem button component="a" href="#literaturecited">
              Literature cited
            </ListItem>
          </List>
        </Grid>

        <div id="currentsources">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Taxonomic Sources
          </Typography>
          <Typography variant="body2" gutterBottom="True" align="justify">
            The following sources have been included in the TNRS v4.1 database:
          </Typography>

          <div className={classes.root}>
            <Grid container spacing={1} alignItems="stretch">
              {sourcesAvailable.map((s) => (
                <Grid
                  item
                  component={Card}
                  direction="column"
                  className={classes.card}
                  justify="space-between"
                  xs
                >
                  <div>
                    <CardMedia
                      className={classes.image}
                      component="img"
                      height="130"
                      width="auto"
                      image={apiServer + s.logo_path}
                    />
                  </div>

                  <div className={classes.page}>
                    <CardContent>
                      <Typography
                        gutterBottom={true}
                        variant="h5"
                        component="h2"
                      >
                        {s.sourceNameFull} [{s.sourceName}]
                      </Typography>
                      <Typography variant="body2" color="black" component="p">
                        {s.description} <br />
                        <br />
                        Date Accessed: {s.tnrsDateAccessed}
                      </Typography>
                    </CardContent>
                  </div>

                  <div className={classes.action}>
                    <CardActions>
                      <Button href={s.dataUrl} size="small" color="primary">
                        Data
                      </Button>
                      <Button href={s.sourceUrl} size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>

        <br />
        <br />

        <div id="becomingprovider">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Becoming a data provider
          </Typography>
        </div>

        <div id="whoshouldjoin">
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1" align="justify">
                  Who should become a data provider for the TNRS?
                </Typography>
              }
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body2" align="justify">
                  Curators of databases of high quality plant taxonomy (taxonomy
                  for any group of organisms goverened by the ICN, or
                  International Code of Nomenclature for algae, fungi, and
                  plants) are encouraged to make their names and synonymy
                  available via the TNRS. Doing so will make it easier for
                  researchers to standardize their names according to your
                  taxonomy. We welcome both synonymized regional checklists
                  (such as USDA Plants) and monographic treatments of species
                  within families or other higher taxa (for example, the Global
                  Compositae Checklist). Potential data providers should begin
                  by contacting our support staff at{" "}
                  <a href="mailto:support@cyverse.com">support@cyverse.com</a>.
                </Typography>
              }
            ></ListItemText>
          </ListItem>
        </div>

        <div id="howtoshare">
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1" align="justify">
                  How do I share my taxonomy?
                </Typography>
              }
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body2" align="justify">
                  TNRS staff will work with you to develop the most effective
                  method of sharing your taxonomic information. Exposing your
                  data via the TNRS requires that we import your names and
                  synonymy to a local database optimized for rapid access by our
                  name resolution search engine. Although we can perform
                  one-time imports, for actively curated database, regularly
                  schedule ingests using a web service or live database link are
                  the best way to ensure up-to-date representation of your data.
                </Typography>
              }
            ></ListItemText>
          </ListItem>
        </div>

        <div id="exportformat">
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1" align="justify">
                  TNRS Simple Darwin Core export format
                </Typography>
              }
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body2" align="justify">
                  The simplest way to share your taxonomic information with the
                  TNRS is as an export structured according to the TNRS Simple
                  Darwin Core format. Taxonomic data formatted in this way can
                  be added immediately to the TNRS database using our existing
                  Darwin Core import utility. Detailed instructions on how to
                  prepare you data in this format are provided in the document{" "}
                  <a href="http://tnrs.iplantcollaborative.org/tnrs_dwc_template_instructions.txt">
                    TNRS Simplified Darwin Core format
                  </a>
                  .
                </Typography>
              }
            ></ListItemText>
          </ListItem>
        </div>

        <div id="literaturecited">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Literature cited
          </Typography>

          {citationsAvailable.map((citation) => {
            let parsed = new Cite(citation.citation);
            return (
              <div className={classes.citation}>
                <Typography variant="body1" gutterBottom={true} align="justify">
                  <strong>{citation.source.toUpperCase()}</strong>
                </Typography>
                <Typography variant="body2" gutterBottom={true} align="justify">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: parsed.format("bibliography", {
                        format: "html",
                        template: "apa",
                        lang: "en-US",
                      }),
                    }}
                  ></div>
                </Typography>
                <BibTexDialog displayText={citation.citation} />
                <br />
              </div>
            );
          })}
        </div>
      </Layout>
    </>
  );
}

SourcesApp.getInitialProps = async () => {
  let sources = await loadSources();
  let citations = await loadCitations();

  return { sourcesAvailable: sources, citationsAvailable: citations };
};

export default SourcesApp;
