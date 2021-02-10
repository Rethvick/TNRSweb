import { Layout } from "../components";
import Head from "next/head";
import { useState } from "react";

import axios from "axios";

import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@material-ui/core";

const Cite = require("citation-js");

const apiServer = process.env.apiServer;
const apiEndPoint = process.env.apiEndPoint;

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

function HowCiteApp({ citationsAvailable }) {
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
          If results derived from the TNRS are used in a publication, please
          cite:
        </Typography>
        <Typography variant="body2" gutterBottom={true} align="justify">
          Botanical Information and Ecology Network (n.d.). Taxonomic Name
          Resolution Service v5.0. Accessed January 22, 2021 from
          https://tnrs.biendata.org/.
        </Typography>
        <br />

        <Typography variant="h5" gutterBottom="True" align="justify">
          Please acknowledge separately the individual taxonomic sources used to
          process your data:
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
          <br />
          <br />
          Note: for taxonomic sources, "Accessed" is the date of download of
          data from that source when building the current TNRS database (see
          also <a href="/sources">Sources</a>).
        </Typography>

        {/*
        <div id="literaturecited">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Literature cited
          </Typography>

          {citationsAvailable.map((citation) => {
            // parse data
            let parsed = new Cite(citation.citation);
            // get today's data
            let options = { year: "numeric", month: "short", day: "numeric" };
            let today = new Date();
            // fill accessed_date
            var accessed_date =
              ", " +
              parsed.data[0].note?.replace(
                "<date_of_access>",
                today.toLocaleDateString("en-US", options)
              );
            // check if note was empty
            if (accessed_date == ", undefined") {
              accessed_date = "";
            }
            return (
              <div>
                <Typography variant="body1" gutterBottom={true} align="justify">
                  <strong>{citation.source.toUpperCase()}</strong>
                </Typography>
                <Typography variant="body2" gutterBottom={true} align="justify">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        parsed
                          .format("bibliography", {
                            format: "html",
                            template: "apa",
                            lang: "en-US",
                            // remove part of the html that contains the closing div tag
                            // and add the accessed date
                          })
                          .slice(0, -13) +
                        accessed_date +
                        "</div>",
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

HowCiteApp.getInitialProps = async () => {
  let citations = await loadCitations();
  return { citationsAvailable: citations };
};

export default HowCiteApp;
