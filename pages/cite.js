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

function HowCiteApp({ sourcesAvailable, citationsAvailable }) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>How to Cite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Typography
          variant="h3"
          align="justify"
          display="block"
          gutterBottom="True"
        >
          How to Cite the TNRS
        </Typography>
        
        {/*<Typography variant="h6" gutterBottom align="justify">*/}
        <Typography variant="h5" gutterBottom="True" align="justify">
          To cite the Taxonomic Name Resolution Service:
        </Typography>
		<Typography variant="body2" gutterBottom={true} align="justify">
			﻿Boyle, B., N. Hopkins, Z. Lu, J. A. Raygoza Garay, D. Mozzherin, T. 
			Rees, N. Matasci, M. L. Narro, W. H. Piel, S. J. McKay, S. Lowry, C. 
			Freeland, R. K. Peet, and B. J. Enquist. 2013. The taxonomic name 
			resolution service: an online tool for automated standardization of 
			plant names. BMC bioinformatics 14:16. doi:10.1186/1471-2105-14-16.
		</Typography>
		<br />

        <Typography variant="h5" gutterBottom="True" align="justify">
        	If results derived from the TNRS are used in a publication, 
        	please cite:
        </Typography>
		<Typography variant="body2" gutterBottom={true} align="justify">
			Botanical Information and Ecology Network (n.d.). Taxonomic Name 
			Resolution Service v5.0. Accessed January 22, 2021 from 
			https://tnrs.biendata.org/.
        </Typography>
		<br />

        <Typography variant="h5" gutterBottom="True" align="justify">
        	Please acknowledge separately the individual taxonomic sources 
        	used to process your data: 
        </Typography>
		<Typography variant="body2" gutterBottom={true} align="justify">
			Missouri Botanical Garden. (n.d.). Tropicos. Missouri Botanical 
			Garden. Accessed May 30, 2020 from http://www.tropicos.org.
			<br />
			The Plant List, version 1.1. (2013). Accessed June 26, 2020 from 
			http://www.theplantlist.org.
			<br />
			USDA, NRCS. (n.d.). The PLANTS Database. National Plant Data Team. 
			Accessed July 3, 2020 from http://plants.usda.gov.
			<br /><br />
			Note: for taxonomic sources, "Accessed" is the date of download
			of data from that source when building the current TNRS database 
			(see also <a href="/sources">Sources</a>).        
        </Typography>

      </Layout>
    </>
  );
}

export default HowCiteApp;
