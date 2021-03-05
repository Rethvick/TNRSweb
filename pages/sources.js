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
  Hidden,
} from "@material-ui/core";

import { requestSources } from "../actions"

const apiServer = process.env.apiServer;

function SourcesApp({ sourcesAvailable }) {
  console.log(sourcesAvailable)
  return (
    <>
      <Head>
        <title>TNRS - Sources</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography variant="h3" align="justify" display="block" gutterBottom>
          Sources
        </Typography>

        <div id="currentsources">
          <Typography variant="h5" gutterBottom align="justify">
            Taxonomic data providers
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            {/* TODO: dynamic numbering here */}
            TNRS version 5.0 consults the following sources of nomenclatural and
            taxonomic information:
          </Typography>

          <List>
            {sourcesAvailable.map((s) => (
              <div key={s.sourceName}>
                <ListItem>
                  <Hidden xsDown>
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
                  </Hidden>
                  <ListItemText>
                    <Typography gutterBottom variant="h6" component="h2">
                      {s.sourceNameFull} - {s.sourceName.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" component="p">
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
              </div>
            ))}
          </List>
        </div>
        <br />

        <div id="reporterrors">
          <Typography variant="h5" gutterBottom align="justify">
            Reporting errors
          </Typography>
          <Typography variant="body2" align="justify" gutterBottom>
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
  let sources = await requestSources();
  return { sourcesAvailable: sources };
};

export default SourcesApp;
