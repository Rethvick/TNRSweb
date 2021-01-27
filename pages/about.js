import { Layout } from "../components";
import Head from "next/head";

import { Typography, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";
import axios from "axios";

const apiServer = process.env.apiServer;
const apiEndPoint = process.env.apiEndPoint;

const loadCollab = async () => {
  const query = {
    opts: {
      mode: "collaborators",
    },
  };

  return await axios
    .post(apiEndPoint, query, {
      headers: { "Content-Type": "application/json" },
    })
    .then(
      (response) => {
        let collab_list = response.data;
        return collab_list;
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

function AboutApp({ collaboratorsAvailable }) {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>TNRS - About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography
          variant="h3"
          align="justify"
          display="block"
          gutterBottom="True"
        >
          About TNRS
        </Typography>
        <Typography variant="h5" align="justify">
          Table of Contents
        </Typography>
        <Grid item xs={12}>
          <List className="contents">
            <ListItem button component="a" href="#whattnrs">
              What is TNRS?
            </ListItem>
            <ListItem button component="a" href="#whytnrs">
              Why do we need a TNRS?
            </ListItem>
            <ListItem button component="a" href="#wheretnrs">
              Where does TNRS get its synonymy
            </ListItem>
            <ListItem button component="a" href="#howtnrs">
              How does the TNRS work?
            </ListItem>
            <ListItem button component="a" href="#software">
              Software
            </ListItem>
            <ListItem button component="a" href="#contributors">
              Contributors
            </ListItem>
            <ListItem button component="a" href="#funding">
              Funding
            </ListItem>
            <ListItem button component="a" href="#tnrsapi">
              TNRS API
            </ListItem>
            <ListItem button component="a" href="#sourcecode">
              Source code
            </ListItem>
            <ListItem button component="a" href="#releasenotes">
              Release notes
            </ListItem>
          </List>
        </Grid>

        <div id="whattnrs">
          <Typography variant="h5" gutterBottom="True" align="justify">
            What is the Taxonomic Name Resolution Service?
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            The Taxonomic Name Resolution Service (TNRS) is a tool for the
            computer-assisted standardization of plant scientific names. The
            TNRS corrects spelling errors and alternative spellings to a
            standard list of names, and converts out of date names (synonyms) to
            the current accepted name. The TNRS can process many names at once,
            saving hours of tedious and error-prone manual name correction. For
            names that cannot be resolved automatically, the TNRS present a list
            of possibilities and provides tools for researching and selecting
            the preferred name.
          </Typography>

          <br />
        </div>

        <div id="whytnrs">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Why do we need a TNRS?
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            Taxonomic standardization is a major challenge for virtually every
            field of plant biology. Ecological studies encompassing large
            numbers of species, conservation decisions based on data from
            multiple sources, molecular analyses linking sequence data to
            organisms all require accurate species names, and the correct
            matching of names among data sets.
            <br />
            <br />
            Misspelled or out-of-date, synonymous names can be a major source of
            error. Large, collaborative databases such as{" "}
            <Link href="http://www.gbif.org/">GBIF</Link>,{" "}
            <Link href="http://splink.cria.org.br/index?&setlang=en">
              SpeciesLink
            </Link>
            , <Link href="http://www.vegbank.org/">VegBank</Link>,{" "}
            <Link href="http://www.salvias.net/">SALVIAS</Link>,
            <Link href="http://traitnet.ecoinformatics.org/">TrailNet</Link>,
            and <Link href="http://www.ncbi.nlm.nih.gov/genbank/">GenBank</Link>{" "}
            are plagued by taxonomic problems, with up to 30% of names unmatched
            to any published name. Even among published names, 5% to 20% are
            synonymous. Despite the growing availability of digitized sources of
            names (<Link href="http://www.ipni.org/">www.ipni.org</Link>,{" "}
            <Link href="http://www.globalnames.org/">www.globalnames.org</Link>,
            <Link href="http://www.tropicos.org/">www.tropicos.org</Link>,{" "}
            <Link href="http://www.ubio.org/">www.ubio.org</Link>) and taxonomic
            opinion (
            <Link href="http://www.tropicos.org/">www.tropicos.org</Link>,
            <Link href="http://www.theplantlist.org/">
              www.theplantlist.org
            </Link>
            ), taxonomic standardization remains an error-prone and largely
            manual process. The need for an automated name resolution service
            has never been greater.
          </Typography>

          <br />
        </div>

        <div id="wheretnrs">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Where does the TNRS get its synonymy?
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            Synonymy is the conversion of out-of-date (synonymous) names to
            accepted names. Such conversions are not always simple; taxonomists
            can differ in their opinion as to which of a series of names is the
            correct one. Where possible, the TNRS presents a single best
            accepted name, as determined by the selected source(s) according to
            source specific data. In the case of Tropicos, a computed acceptance
            algorithm is used to provide a variety of decision criteria,
            including date of publication and acceptance within exper-curated
            project checklists, as the basis for choosing among conflicting
            taxonomic opinions. Computed acceptance is a machine-based decision
            process, and users of the TNRS should bear in mind the following
            caveat provided by Tropicos:
            <br />
            <br />
            Computed acceptance is an automated evaluation of acceptance using
            Tropicos digital flora projects, homotypic synonymy, and heterotypic
            synonymy. This is NOT a human-curated, peer-reviewed checklist. Its
            quality is driven by our algorithm and the accuracy and availability
            of the data in the Tropicos system.
          </Typography>
          <br />
        </div>

        <div id="howtnrs">
          <Typography variant="h5" gutterBottom="True" align="justify">
            How does the TNRS work?
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            The TNRS attempts to match each name submitted to a published
            scientific name in the TNRS database, correcting spelling if
            necessary. Once the name has been matched, if the name is a synonym
            it is converted to the correct (accepted) name.
            <br />
            <br />
            Spelling correction consists of the following steps:
            <br />
            <br />
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            The TNRS attempts to match each name submitted to a published
            scientific name in the TNRS database, correcting spelling if
            necessary. Once the name has been matched, if the name is a synonym
            it is converted to the correct (accepted) name.
            <br />
            <br />
            Spelling correction consists of the following steps:
            <br />
            <List>
              <ListItem>
                <Typography variant="body2">
                  1. <strong>Match</strong>. The TNRS attempts to match the name
                  directly to a name in the TNRS database.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  2. <strong>Parse</strong>. If matching fails, the name is
                  parsed to separate out any contaminating substrings that may
                  prevent matching, and to decompose the name into component
                  parts that can be analyzed separately (for example, the genus
                  name is separated from the specific epithet). Parsing is
                  performed by our implementation of the GNI name parser.{" "}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  3. <strong>Match</strong>. The parsed name components are
                  again matched against the TNRS database.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  4. <strong>Fuzzy match</strong>. If the parsed name fails to
                  match fully, the TNRS attempt to find near matches using a
                  modified Taxamatch taxonomic fuzzy matching algorithm. Fuzzy
                  matching is generally slow; however, the Taxamatch algorithm
                  speeds matching by searching within the taxonomic hierarchy.
                  For example, once the genus has been identified, only species
                  within that genus are searched. Although the original
                  Taxamatch was limited to finding genera and species, the TNRS
                  implementation can match up to family (if submitted), and down
                  to subspecies and varieties (trinomials), even varieties
                  within subspecies (quadrinomials).
                </Typography>
              </ListItem>
            </List>
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            These steps are illustrated in the figure below:
          </Typography>

          {/* </Typography> */}
          <br />
        </div>

        <div id="software">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Software
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            Code from the following open source applications was used during the
            development of the TNRS:
          </Typography>

          <List>
            <ListItem>
              <Link href="http://www.cmar.csiro.au/datacentre/taxamatch.htm">
                Original Taxamatch Algorithm
              </Link>{" "}
              - Developed by Tony Rees (CSIRO).
            </ListItem>
            <ListItem>
              {" "}
              <Link href="http://www.silverbiology.com/products/taxamatch/">
                Taxamatch Web Service (a PHP Port)
              </Link>{" "}
              - Special thanks for assistance from (
              <Link href="http://tnrs.iplantcollaborative.org/----">
                Michael Giddens
              </Link>
              ).
            </ListItem>
            <ListItem>
              <Link href="http://gni.globalnames.org/parsers/new">
                Global Names Index (Parser)
              </Link>{" "}
              - Special thanks for assistance from{" "}
              <Link href="http://tnrs.iplantcollaborative.org/-----">
                Dmitry Mozzherin
              </Link>
              .
            </ListItem>
          </List>
        </div>

        <div id="contributors">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Contributors
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            TNRS was developed by the iPlant Collaborative Tree of Life Project,
            in collaboration with the{" "}
            <Link href="http://www.mobot.org/">Missouri Botanical Garden</Link>{" "}
            and the{" "}
            <Link href="http://bien.nceas.ucsb.edu/bien/">
              Botanical Information and Ecology Network
            </Link>
            .
            <br />
            <br />
            Numerous members of the taxonomic and informatics community provided
            advice , access to data, and source code.
          </Typography>

          <Typography variant="h6" gutterBottom="True" align="justify">
            Project direction and development
          </Typography>

          <List>
            <ListItem>Brad Boyle</ListItem>
            <ListItem>Brian Enquist</ListItem>
            <ListItem>Juan Antonio Raygoza Garay</ListItem>
            <ListItem>Nicole Hopkins</ListItem>
            <ListItem>Zhenyuan Lu</ListItem>
            <ListItem>Naim Matasci</ListItem>
            <ListItem>Martha Narro</ListItem>
            <ListItem>Shannon Oliver</ListItem>
            <ListItem>William Piel</ListItem>
            <ListItem>Jill Yarmchuk</ListItem>
            <ListItem>iPlant staff</ListItem>
          </List>

          <Typography variant="h6" gutterBottom="True" align="justify">
            Collaborators
          </Typography>

          <List>
            <ListItem>
              Bob Magill (
              <Link href="http://www.mobot.org/">
                Missouri Botanical Garden
              </Link>
              )
            </ListItem>
            <ListItem>
              Chris Freeland (
              <Link href="http://www.mobot.org/">
                Missouri Botanical Garden
              </Link>
              )
            </ListItem>
            <ListItem>
              Chuck Miller (
              <Link href="http://www.mobot.org/">
                Missouri Botanical Garden
              </Link>
              )
            </ListItem>
            <ListItem>
              Peter Jorgensen (
              <Link href="http://www.mobot.org/">
                Missouri Botanical Garden
              </Link>
              )
            </ListItem>
            <ListItem>
              Amy Zanne (
              <Link href="http://www.umsl.edu/">
                University of Missouri, St. Louis
              </Link>
              )
            </ListItem>
            <ListItem>
              Peter Stevens (
              <Link href="http://www.mobot.org/">
                Missouri Botanical Garden
              </Link>
              )
            </ListItem>
            <ListItem>
              Jay Paige (
              <Link href="http://www.mobot.org/">
                Missouri Botanical Garden
              </Link>
              )
            </ListItem>
            <ListItem>
              Bob Peet (
              <Link href="http://www.unc.edu/">
                University of North Carolina at Chapel Hill
              </Link>
              )
            </ListItem>
            <ListItem>
              Paul Morris (
              <Link href="http://www.harvard.edu/">Harvard University</Link>)
            </ListItem>
            <ListItem>
              Alan Paton (
              <Link href="http://www.kew.org/">Kew Royal Botanic Gardens</Link>{" "}
              and their{" "}
              <Link href="http://www.kew.org/science/directory/projects/IPNI.html">
                International Plant Names Index
              </Link>
              )
            </ListItem>
            <ListItem>
              Tony Rees (
              <Link href="http://www.csiro.au/">
                Commonwealth Scientific and Industrial Research Organisation
              </Link>
              )
            </ListItem>
            <ListItem>
              Michael Giddens (
              <Link href="http://www.silverbiology.com/">
                www.silverbiology.com
              </Link>
              )
            </ListItem>
            <ListItem>
              Dmitry Mozzherin (
              <Link href="http://www.gbif.org/">
                Global Biodiversity Information Facility
              </Link>
              )
            </ListItem>
            <ListItem>
              David Remsen (
              <Link href="http://www.gbif.org/">
                Global Biodiversity Information Facility
              </Link>
              )
            </ListItem>
            <ListItem>
              David Patterson (
              <Link href="http://www.eol.org/">Encyclopedia of Life</Link>)
            </ListItem>
            <ListItem>
              Cam Webb (
              <Link href="http://www.harvard.edu/">Harvard University</Link>)
            </ListItem>
          </List>

          <Typography variant="h6" gutterBottom="True" align="justify">
            Institutions
          </Typography>

          {/* Collaborators */}
          <div className={classes.root}>
            <Grid container spacing={1} alignItems="stretch">
              {collaboratorsAvailable.map((c) => (
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
                      height="200"
                      width="auto"
                      image={apiServer + c.logo_path}
                    />
                  </div>

                  <div className={classes.page}>
                    <CardContent>
                      <Typography
                        gutterBottom={true}
                        variant="body2"
                        component="h2"
                      >
                        {c.collaboratorNameFull}
                      </Typography>
                      <Typography variant="body2" color="black" component="p">
                        {c.description}
                      </Typography>
                    </CardContent>
                  </div>

                  <div className={classes.action}>
                    <CardActions>
                      <Button
                        href={c.collaboratorUrl}
                        size="small"
                        color="primary"
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>

          <br />
          <br />
        </div>

        <div id="funding">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Funding
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            Funding provided by the National Science Foundation Plant
            Cyberinfrastructure Program (grant #DBI-0735191).
          </Typography>
        </div>

        <div id="tnrsapi">
          <Typography variant="h5" gutterBottom="True" align="justify">
            TNRS API
          </Typography>

          <Typography variant="body2" gutterBottom="True" align="justify">
            The TNRS API is in the early stages of development. Currently it
            consists of a single service to which a list of names is submitted.
            <br />
            <br />
            Use GET to call to the matchNames service, found at:
            http://tnrs.iplantc.org/tnrsm-svc/matchNames
            <br />
            <br />
            Easy ways to submit names to the service include entering a query in
            your web browser or using the Linux curl tool.
            <br />
            <br />
            Two parameters are required:
            <br />
            <List>
              <ListItem>
                <Typography variant="body2">
                  <strong>retrieve </strong> specifies whether to retrieve all
                  matches for the names submitted. There are currently two
                  options: retrieve=best etrieves only the single best match for
                  each name submitted; retrieve=all retrieves all matches.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  {" "}
                  <strong>names </strong> is followed by a comma separated list
                  of names being submitted. Spaces in names must be url-encoded.{" "}
                </Typography>
              </ListItem>
            </List>
            <br />
            Here is a short example in which the best matches are requested for
            four names:
            <br />
            http://tnrs.iplantc.org/tnrsm-svc/matchNames?
            <br />
            retrieve=best&names=zea%20mays,acacia,solanum,saltea
            <br />
            <br />
            An example call to the API using R can be found in
            <Link href="http://tnrs.iplantcollaborative.org/tnrs_example.R">
              this document
            </Link>
            .
            <br />
            <br />
            Output is currently returned in JSON format. The service will be
            expanded soon to support output in XML and CSV as well. In addition,
            parameters will be added soon to specify output format, encoding,
            and compression of the results.
          </Typography>
        </div>

        <div id="releasenotes">
          <Typography variant="h5" gutterBottom="True" align="justify">
            Release notes
          </Typography>

          <Typography variant="body2">
            <strong>Version 3.2</strong>
            <List>
              <ListItem>
                <Typography variant="body2">
                  Implemented support for additional taxonomic statuses.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  Upgraded the Global Names Index Parser to version 2.1.0.
                </Typography>
              </ListItem>
            </List>
          </Typography>
        </div>
      </Layout>
    </>
  );
}

AboutApp.getInitialProps = async () => {
  let collaborators = await loadCollab();
  return { collaboratorsAvailable: collaborators };
};

export default AboutApp;
