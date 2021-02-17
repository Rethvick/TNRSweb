import { Layout } from "../components";
import Head from "next/head";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
} from "@material-ui/core";

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

function SourcesApp({ sourcesAvailable }) {
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
            {/* TODO: dynamic numbering here */}
            TNRS version 5.0 consults the following sources of nomenclatural and
            taxonomic information:
          </Typography>

          <List>
            {sourcesAvailable.map((s) => (
              <>
                <ListItem>
                  <ListItemIcon>
                    <div>
                      {/* FIXME: make this fit a small screen */}
                      <img
                        style={{ objectFit: "none" }}
                        height="200"
                        width="200"
                        src={apiServer + s.logo_path}
                      />
                    </div>
                  </ListItemIcon>
                  <ListItemText>
                    <Typography gutterBottom={true} variant="h7" component="h2">
                      {s.sourceNameFull} - {s.sourceName.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="black" component="p">
                      {s.description} <br />
                      <br />
                      Date Accessed: {s.tnrsDateAccessed}
                    </Typography>
                    <br />
                    <Box>
                      <a href={s.dataUrl} size="small" color="primary">
                        Data
                      </a>{" "}
                      <a href={s.sourceUrl} size="small" color="primary">
                        Learn More
                      </a>
                    </Box>
                  </ListItemText>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </div>
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

        <br />
      </Layout>
    </>
  );
}

// making initial props available
SourcesApp.getInitialProps = async () => {
  let sources = await loadSources();
  return { sourcesAvailable: sources };
};

export default SourcesApp;
