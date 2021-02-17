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
        <title>Contribute</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <Typography
          variant="h3"
          align="justify"
          display="block"
          gutterBottom="True"
        >
          Becoming a data provider
        </Typography>

        <div id="whoshouldjoin">
			<Typography variant="h5" gutterBottom="True" align="justify">
				Who should become a data provider for the TNRS?
			</Typography>
			<Typography variant="body2" gutterBottom={true} align="justify">
				Curators of databases of high quality plant taxonomy (taxonomy
				for any group of organisms goverened by the ICN, or
				International Code of Nomenclature for algae, fungi, and
				plants) are encouraged to make their names and synonymy
				available via the TNRS. Doing so will make it easier for
				researchers to standardize their names according to your
				taxonomy. We welcome both synonymized regional checklists
				and taxonomy from monographic treatments of species within
				families or other higher taxa. Potential data providers 
				should begin by contacting us at{" "}
				<a href="mailto:support@tnrs.biendata.org" 
				target="_blank">support@tnrs.biendata.org</a>.
			</Typography>
			<br />

			<Typography variant="h5" gutterBottom="True" align="justify">
				How do I share my taxonomy?
			</Typography>
			<Typography variant="body2" gutterBottom={true} align="justify">
				TNRS developers will work with you to develop the most effective
				method of sharing your taxonomic information. Exposing your
				data via the TNRS requires that we import your names and
				synonymy to a local database optimized for rapid access by our
				name resolution search engine. Although we can perform
				one-time imports, for actively curated database, regularly
				schedule ingests using a web service or live database link are
				the best way to ensure up-to-date representation of your data.
			</Typography>
			<br />

			<Typography variant="h5" gutterBottom="True" align="justify">
				TNRS Simple Darwin Core export format
			</Typography>
			<Typography variant="body2" gutterBottom={true} align="justify">
				The simplest way to share your taxonomic information with the
				TNRS is as an export structured according to the TNRS Simple
				Darwin Core format. Taxonomic data formatted in this way can
				be added immediately to the TNRS database using our existing
				Darwin Core import utility. Detailed instructions on how to
				prepare you data in this format are provided in the 
				document{" "}<a href="tnrs_dwc_template_instructions.txt">
				TNRS Simplified Darwin Core format</a>.
			</Typography>
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
