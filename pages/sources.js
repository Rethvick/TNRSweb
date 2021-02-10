import { Layout } from "../components";
import Head from "next/head";

import { Typography, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import axios from "axios";

const apiServer = process.env.apiServer;
const apiEndPoint = process.env.apiEndPoint;

const loadSources = async () => {
  // build query
  const query = {
    opts: {
      mode: "sources",
    },
  };
  // return axios request
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

function SourcesApp({ sourcesAvailable }) {
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
            TNRS version 5.0 consults the following sources of nomenclatural and
            taxonomic information:
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
        <br />
        <br />

        <div id="reporterrors">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Reporting errors
          </Typography>
          <Typography variant="body2" align="justify" gutterBottom="True">
            Please contact us at{" "}
            <a href="mailto:support@tnrs.biendata.org">
              support@tnrs.biendata.org
            </a>
            if you encounter errors or have questions regarding taxonomic
            opinions transmitted by the TNRS. However, unless the error is due
            to a bug in the TNRS, we will generally recommend you contact our
            taxonomic data providers directly.
          </Typography>
        </div>
      </Layout>
    </>
  );
}

SourcesApp.getInitialProps = async () => {
  let sources = await loadSources();
  return { sourcesAvailable: sources };
};

export default SourcesApp;
