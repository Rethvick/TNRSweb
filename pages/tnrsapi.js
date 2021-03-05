import { Layout } from "../components";
import Head from "next/head";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Link from "next/link";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
} from "@material-ui/core";

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

function ApiApp({ collaboratorsAvailable }) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>TNRS - API</title>
        <a rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>

        <Typography variant="h3" align="justify" display="block" gutterBottom>
          TNRS Application Programming Interfaces
        </Typography>
        
{/* 
        <Typography variant="h5" align="justify">
          Table of Contents
        </Typography>
        <br />

        <Typography variant="body2" gutterBottom align="justify">
          <a href="#tnrsapi">TNRS API</a>
          <br />
          <a href="#rtnrs">TNRS R package</a>
          <br />
        </Typography>
        <br />
*/}
        <div id="tnrsapi">
          <Typography variant="h5" gutterBottom align="justify">
            TNRS API
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            The TNRS web interface uses the{" "}
            <a href="https://github.com/ojalaquellueva/TNRSapi" target="_blank">
              new TNRS API
            </a>{" "}
            to access the upgraded{" "}
            <a
              href="https://github.com/ojalaquellueva/TNRSbatch"
              target="_blank"
            >
              TNRS 5.0 search engine
            </a>
            . The TNRS API functions handles all traffic between external
            applications and the TNRS search engine. Consequently, all features
            available via the web interface are also accessible by calling API
            directly. Because the API is accessed programmatically, it can be
            used to process large batches of names (exceeding the current limit
            of 5000 names) rapidly by looping through large name lists in
            batches of 5000. The TNRS API can be used by third-party developers
            wishing to include TNRS content and search capabilities in their
            applications. For more information on the TNRS API and detailed
            instructions and examples of how to access the API in languages such
            as R and PHP, see documentation on the{" "}
            <a href="https://github.com/ojalaquellueva/TNRSapi" target="_blank">
              TNRS API GitHub repository
            </a>
          </Typography>
          <br />
        </div>

        <div id="rtnrs">
          <Typography variant="h5" gutterBottom align="justify">
            TNRS R package
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            Users who are familiar with the{" "}
            <a href="https://www.r-project.org/" target="_blank">
              R programming language
            </a>{" "}
            may prefer to access the TNRS using the{" "}
            <a href="https://github.com/EnquistLab/RTNRS" target="_blank">
              RTNRS R package
            </a>
            . Among other advantages, using RTNRS provides an efficient way to
            process large taxonomic lists which exceed limit of 5000 names per
            batch, as you can loop through the names in batches. All options
            currently available directly from the TNRS API or via the TNRS web
            user interface are also available via the R package.
          </Typography>
          <br />
        </div>

      </Layout>
    </>
  );
}


export default ApiApp;
