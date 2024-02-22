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

import { requestSources, requestMeta } from "../actions";

function SourcesApp() {
  const [sourcesState, setSourcesState] = useState([]);
  const [appVersion, setAppVersion] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");

  useEffect(() => {
    async function fetchData() {
      let sources = await requestSources();
      setSourcesState(sources);

      let meta = await requestMeta();
      setAppVersion(meta.app_version);

      scrollToSelectedSource();
    }
    fetchData();
  }, []);

  useEffect(() => {
    scrollToSelectedSource();
  }, []);

  const scrollToSelectedSource = () => {
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  };


  return (
    <>
      <Layout>
        <Typography variant="h3" align="justify" display="block" gutterBottom id="sources-header">
          Sources
        </Typography>
        <div id="currentsources">
          <Typography variant="h5" gutterBottom align="justify">
            Taxonomic data providers
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            TNRS version {appVersion} consults the following sources of nomenclatural and
            taxonomic information:
          </Typography>
          <List>
            {sourcesState.map((s) => (
                <div
                    key={s.sourceName}
                    id={`source-${s.sourceName}`}
                    ref={(ref) =>
                        ref &&
                        selectedSource === s.sourceName.toLowerCase() &&
                        ref.scrollIntoView({behavior: "smooth"})
                    }
                >
                  <ListItem
                      ref={ref => ref && selectedSource === s.sourceName.toLowerCase() && ref.scrollIntoView({behavior: 'smooth'})}>
                    <Hidden xsDown>
                      <ListItemIcon>
                        <Box p={4}>
                          {/* FIXME: make this fit a small screen */}
                          <img
                              style={{objectFit: "scale-down"}}
                              height="150"
                              width="150"
                              src={s.logo_path}
                          />
                        </Box>
                      </ListItemIcon>
                    </Hidden>
                    <ListItemText>
                      <Typography gutterBottom variant="h6" component="h2">
                        <Link href={s.sourceUrl} size="small" color="primary" target="_blank" rel="noopener noreferrer">
                          {s.sourceNameFull} - {s.sourceName.toUpperCase()}
                        </Link>
                      </Typography>
                      <Typography variant="body2" component="p">
                        {s.description} <br/>
                        <br/>
                        Date Accessed: {s.tnrsDateAccessed}
                        <br/>
                        {/* Display version only when available */}
                        {s.version !== null &&
                            <span>Version: {s.version}</span>
                        }
                      </Typography>
                      <br/>
                      <Box>
                        <Link href={s.dataUrl} size="small" color="primary" target="_blank" rel="noopener noreferrer">
                          Data
                        </Link>
                        {" | "}
                        <Link href={s.sourceUrl} size="small" color="primary" target="_blank" rel="noopener noreferrer">
                          Learn More
                        </Link>
                      </Box>
                    </ListItemText>
                  </ListItem>
                  <Divider/>
                </div>
            ))}
          </List>
        </div>
        <br/>
        <div id="reporterrors">
          <Typography variant="h5" gutterBottom align="justify">
            Reporting errors
          </Typography>
          <Typography variant="body2" align="justify" gutterBottom>
            Please contact us at <Link href="mailto:support@tnrs.biendata.org">
              support@tnrs.biendata.org
            </Link> if you encounter errors or have questions regarding taxonomic
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
