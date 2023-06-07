import { Layout } from "../components";
import { useState, useEffect } from "react";

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

import { requestCitations } from "../actions";

const Cite = require("citation-js");

const renderCitations = (citationsAvailable) => {
  var result = {};
  citationsAvailable.map((citation) => {
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

    let parsedRendered =
      parsed.format("bibliography", {
        format: "text",
        template: "apa",
        lang: "en-US",
        // remove part of the html that contains the closing div tag
        // and add the accessed date
      }) + accessed_date;

    result[citation.source] = (
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html: parsedRendered,
          }}
        ></div>
        <BibTexDialog displayText={citation.citation} />
        <br />
      </div>
    );
  });
  return result;
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
      <Link href="#" onClick={handleClickOpen}>
        [bibtex]
      </Link>
      <Dialog maxWidth={"md"} fullWidth open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"BibTeX entry"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {displayText.split("\n").map((line, index) => {
              if ((index > 0) & (line != "}")) {
                line = "\xa0\xa0\xa0\xa0" + line;
              }
              return (
                <span key={index}>
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

function HowCiteApp() {
  let [renderedCitations, setRenderedCitations] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let citations = await requestCitations();
      let rendered = renderCitations(citations);
      setRenderedCitations(rendered);
    }
    fetchData();
  }, []);


  return (
    <>
      <Layout>
        <Typography variant="h3" align="justify" display="block" gutterBottom>
          How to Cite the TNRS
        </Typography>

        {/*<Typography variant="h6" gutterBottom align="justify">*/}
        <Typography variant="h5" gutterBottom align="justify">
          To cite the Taxonomic Name Resolution Service:
        </Typography>

        {renderedCitations.tnrs_pub}

        <Typography variant="h5" gutterBottom align="justify">
          If results derived from the TNRS are used in a publication, please
          cite:
        </Typography>

        {renderedCitations.tnrs}

        <Typography variant="h5" gutterBottom align="justify">
          Please acknowledge separately the individual taxonomic sources used to
          process your data:
        </Typography>

        {renderedCitations.tropicos}
        {renderedCitations.tpl}
        {renderedCitations.usda}


      </Layout>
    </>
  );
}

HowCiteApp.getInitialProps = async () => {
  let citations = await requestCitations();
  return { citationsAvailable: citations };
};

export default HowCiteApp;
