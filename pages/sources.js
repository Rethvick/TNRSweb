import { Layout } from "../components";
import Head from "next/head";

import { Typography } from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Link } from '@material-ui/core';
import axios from "axios";
import { useState } from "react";

function AboutApp() {

  const apiEndPoint = "http://vegbiendev.nceas.ucsb.edu:8975/tnrs_api.php";

  const [sources, setSources] = useState([]);

    const query = {
      opts: {
        mode: "sources",
      },
    };

      axios
      .post(apiEndPoint, query, {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (response) => {
          setSources(response.data);
        },
        () => {
          alert("There was an error while retrieving the sources");
        }
      )
  // };


  return (
    <>
      <Head>
        <title>TNRS - Sources</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography variant="h3" align="justify" display="block" gutterBottom="True">Sources</Typography>
        <Typography variant="body2" align="justify" gutterBottom="True">The goal of TNRS is to provide the end user the ability to resolve their list of names against a number of sources.
        The team of developers at TNRS makes no attempt to determine the authority of the names, rather we provide the information that is available from these sources
         in a centralized location for matching of submitted names. Should you encounter issues with names that are lacking, please contact the source curators directly.</Typography>
        <Typography variant="h5" align="justify">Table of Contents</Typography>
        <Grid item xs={12}>
          <List className="contents">
          <ListItem button component="a" href="#tnrsupdated">TNRS database updated</ListItem>
          <ListItem button component="a" href="#currentsources">Current taxonomic sources</ListItem>
          <ListItem button component="a" href="#becomingprovider">Becoming a data provider</ListItem>
          <ListItem button component="a" href="#whoshouldjoin">Who should become a data provider for the TNRS?</ListItem>
          <ListItem button component="a" href="#howtoshare">How do I share my taxonomy?</ListItem>
          <ListItem button component="a" href="#exportformat">TNRS Simple Darwin Core export format</ListItem>
          </List>
        </Grid>
<div id="tnrsupdated">
        <Typography variant="h5" gutterBottom="True" align="justify">
        TNRS database updated 24 Jul 2020
        </Typography>
        <Typography variant="body1" align="justify" gutterBottom="True">
        The TNRS database was updated to version 4.1 on 24 Jul 2020. Relative to the previous version (4.1) the main differences are as follows:
        </Typography>

        <List>
          <ListItem>
            <Typography variant="body2">1. <strong>Tropicos updated </strong> (content accessed 30 May 2020)</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">2. <strong>USDA Plants updated </strong> (content accessed 3 July 2020)</Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2">
              3. 
              <strong>Sources GCC and ILDIS are now included in TPL and 
              no longer listed as separate sources. 
              </strong> In TNRS 4.0, these sources were served separately from The 
              Plant List. This resulted in invalid/illegitimate names 
              being exposed as the best match when querying source TPL 
              for taxon names in families Asteraceae and Fabaceae. 
              Retaining these sources in TPL in TNRS v4.1 now faithfully 
              represents the taxonomic content of TPL 1.1.
            </Typography>
          </ListItem>
          <ListItem>
          <Typography variant="body2">
              4. 
              <strong>NCBI no longer included as taxonomic source. 
              </strong> Changes to the taxonomic model and content of NCBI Taxomomy have rendered 
              it incompatible with the strict nomenclatural model of the TNRS. This 
              source has been removed from the TNRS to avoid introducing anomalies
            </Typography>
          </ListItem>
        </List>
      </div>
 
      <div id="currentsources">

        <Typography variant="h5" gutterBottom="True" align="justify">
        Current Sources
        </Typography>
        <Typography variant="body2" gutterBottom="True" align="justify">
        The following sources have been included in the TNRS v4.1 database:
        </Typography>

      </div>

      <div id="becomingprovider">
        <Typography variant="h5" gutterBottom="True" align="justify">
        Becoming a data provider
        </Typography>
      </div>

      <div id="whoshouldjoin">
        <ListItem>
          <ListItemText primary={
            <Typography variant="body1" align="justify">
              Who should become a data provider for the TNRS?
            </Typography>}>
          </ListItemText>
        </ListItem>


        <ListItem>
          <ListItemText primary={
            <Typography variant="body2" align="justify">
              Curators of databases of high quality plant taxonomy (taxonomy for any group of organisms 
              goverened by the ICN, or International Code of Nomenclature for algae, fungi, and plants) 
              are encouraged to make their names and synonymy available via the TNRS. 
              Doing so will make it easier for researchers to standardize their names according to your taxonomy. 
              We welcome both synonymized regional checklists (such as USDA Plants) and monographic 
              treatments of species within families or other higher taxa (for example, the Global Compositae Checklist). 
              Potential data providers should begin by contacting our support staff at <a href="mailto:support@cyverse.com">support@cyverse.com</a>.
            </Typography>}>
          </ListItemText>
        </ListItem>

      </div>

      <div id="howtoshare">

        <ListItem>
          <ListItemText primary={
            <Typography variant="body1" align="justify">
              How do I share my taxonomy?
            </Typography>}>
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText primary={
            <Typography variant="body2" align="justify">
              TNRS staff will work with you to develop the most effective method of sharing your 
              taxonomic information. Exposing your data via the TNRS requires that we import 
              your names and synonymy to a local database optimized for rapid access by our 
              name resolution search engine. Although we can perform one-time imports, 
              for actively curated database, regularly schedule ingests using a web 
              service or live database link are the best way to ensure up-to-date 
              representation of your data.
            </Typography>}>
          </ListItemText>
        </ListItem>

      </div>

      <div id="exportformat">

        <ListItem>
          <ListItemText primary={
            <Typography variant="body1" align="justify">
              TNRS Simple Darwin Core export format
            </Typography>}>
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText primary={
            <Typography variant="body2" align="justify">
              The simplest way to share your taxonomic information with the
               TNRS is as an export structured according to the TNRS Simple Darwin 
               Core format. Taxonomic data formatted in this way can be added immediately 
               to the TNRS database using our existing Darwin Core import utility. 
               Detailed instructions on how to prepare you data in this format are provided in the 
               document <a href="http://tnrs.iplantcollaborative.org/tnrs_dwc_template_instructions.txt">
                  TNRS Simplified Darwin Core format
                </a>.
            </Typography>}>
          </ListItemText>
        </ListItem>
      
      </div>
      </Layout>
    </>
  );
}
export default AboutApp;
