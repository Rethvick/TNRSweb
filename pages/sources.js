import { Layout } from "../components";
import { useState, useEffect } from "react";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  Hidden,
  Link,
} from "@material-ui/core";

import { requestSources } from "../actions";

function SourcesApp() {
  let [sourcesState, setSourcesState] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let sources = await requestSources();
      setSourcesState(sources);
    }
    fetchData();
  }, []);

  return (
    <>
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
            {sourcesState.map((s) => (
              <div key={s.sourceName}>
                <ListItem>
                  <Hidden xsDown>
                    <ListItemIcon>
                      <Box p={4}>
                        {/* FIXME: make this fit a small screen */}
                        <img
                          style={{ objectFit: "scale-down" }}
                          height="150"
                          width="150"
                          src={s.logo_path}
                        />
                      </Box>
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
                      <br />
                      {/* Display version only when available */}
                      {s.version !== null &&
                        <span>Version: {s.version}</span>
                      }
                    </Typography>
                    <br />
                    <Box>
                      <Link href={s.dataUrl} size="small" color="primary">
                        Data
                      </Link>
                      {" | "}
                      <Link href={s.sourceUrl} size="small" color="primary">
                        Learn More
                      </Link>
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
            <Link href="mailto:support@tnrs.biendata.org">
              support@tnrs.biendata.org
            </Link>
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

export default SourcesApp;
