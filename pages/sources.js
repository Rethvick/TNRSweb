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

        <div id="currentsources">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Taxonomic data providers
          </Typography>
          <Typography variant="body2" gutterBottom="True" align="justify">
            TNRS version 5.0 consults the following 
            sources of nomenclatural and taxonomic information:
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
                      height="75"
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
        <br /><br />

        <div id="reporterrors">
          <Typography variant="h5" gutterBottom="True" align="justify">
           Reporting errors
          </Typography>
        <Typography variant="body2" align="justify" gutterBottom="True">
			Please contact us at{" "}
	<a href="mailto:support@tnrs.biendata.org">support@tnrs.biendata.org</a>
          if you encounter errors or have questions regarding taxonomic opinions 
          transmitted by the TNRS. However, unless the error is due to a bug 
          in the TNRS, we will generally recommend you contact our
          taxonomic data providers directly. 
        </Typography>
        
        </div>

{/*
        <div id="literaturecited">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Literature cited
          </Typography>

          {citationsAvailable.map((citation) => {
            // parse data
            let parsed = new Cite(citation.citation);
            // get today's data
            let options = { year: 'numeric', month: 'short', day: 'numeric' };
            let today  = new Date();
            // fill accessed_date
            var accessed_date = ', ' + parsed.data[0].note?.replace('<date_of_access>', today.toLocaleDateString("en-US", options))
            // check if note was empty
            if(accessed_date == ', undefined'){
              accessed_date = ''
            }
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
                      // remove part of the html that contains the closing div tag
                      // and add the accessed date
                      }).slice(0, -13) + accessed_date + '</div>',
                    }}
                  ></div>
                </Typography>
                <BibTexDialog displayText={citation.citation} />
                <br />
              </div>
            );
          })}
        </div>
*/}
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
