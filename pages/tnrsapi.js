import { Layout } from "../components";

import { Typography, Link } from "@material-ui/core";

function ApiApp() {
  return (
    <>
      <Layout>
        <Typography variant="h3" align="justify" display="block" gutterBottom>
          TNRS Application Programming Interfaces
        </Typography>
        <div id="tnrsapi">
          <Typography variant="h5" gutterBottom align="justify">
            TNRS API
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            The TNRS web interface uses the{" "}
            <Link href="https://github.com/ojalaquellueva/TNRSapi" target="_blank">
              new TNRS API
            </Link>{" "}
            to access the upgraded{" "}
            <Link
              href="https://github.com/ojalaquellueva/TNRSbatch"
              target="_blank"
            >
              TNRS 5.0 search engine
            </Link>
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
            <Link href="https://github.com/ojalaquellueva/TNRSapi" target="_blank">
              TNRS API GitHub repository
            </Link>
          </Typography>
          <br />
        </div>
        <div id="rtnrs">
          <Typography variant="h5" gutterBottom align="justify">
            TNRS R package
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            Users who are familiar with the{" "}
            <Link href="https://www.r-project.org/" target="_blank">
              R programming language
            </Link>{" "}
            may prefer to access the TNRS using the{" "}
            <Link href="https://github.com/EnquistLab/RTNRS" target="_blank">
              RTNRS R package
            </Link>
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
