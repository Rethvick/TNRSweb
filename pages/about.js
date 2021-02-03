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
        <a rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography
          variant="h3"
          align="justify"
          display="block"
          gutterBottom
        >
          About the TNRS
        </Typography>
        <Typography variant="h5" align="justify">
          Table of Contents
        </Typography>
        <br />

        <Typography variant="body2" gutterBottom align="justify">
          <a href="#whattnrs">What is the TNRS?</a>
          <br />
          <a href="#whytnrs">Why do we need a TNRS?</a>
          <br />
          <a href="#wheretnrs">Where does the TNRS get its taxonomy?</a>
          <br />
          <a href="#howtnrs">How does the TNRS work?</a>
          <br />
          <a href="#tnrsapi">TNRS API</a>
          <br />
          <a href="#rtnrs">TNRS R package</a>
          <br />
          <a href="#sourcecode">Source code</a>
          <br />
          <a href="#software">Contributing software</a>
          <br />
          <a href="#contributors">Contributors</a>
          <br />
          <a href="#funding">Funding</a>
          <br />
        </Typography>
        <br />

        <div id="whattnrs">
          <Typography variant="h5" gutterBottom align="justify">
            What is the Taxonomic Name Resolution Service?
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
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
          <Typography variant="h5" gutterBottom align="justify">
            Why do we need a TNRS?
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
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
            <a href="http://www.gbif.org/" target="_blank">
              GBIF
            </a>
            ,{" "}
            <a
              href="http://splink.cria.org.br/index?&setlang=en"
              target="_blank"
            >
              SpeciesLink
            </a>
            ,{" "}
            <a href="http://www.vegbank.org/" target="_blank">
              VegBank
            </a>
            ,{" "}
            <a href="http://traitnet.ecoinformatics.org/" target="_blank">
              TrailNet
            </a>
            , and{" "}
            <a href="http://www.ncbi.nlm.nih.gov/genbank/" target="_blank">
              GenBank
            </a>{" "}
            are plagued by taxonomic problems, with up to 30% of names unmatched
            to any published name. Even among published names, 5% to 20% are
            synonymous. Despite the growing availability of digitized sources of
            names (
            <a href="http://www.ipni.org/" target="_blank">
              IPNI
            </a>
            ,{" "}
            <a href="http://www.globalnames.org/" target="_blank">
              Global Names
            </a>
            ,{" "}
            <a href="http://www.tropicos.org/" target="_blank">
              Tropicos
            </a>
            ,{" "}
            <a href="http://www.ubio.org/" target="_blank">
              uBio
            </a>
            ) and taxonomic opinion (
            <a href="http://www.tropicos.org/" target="_blank">
              Tropicos
            </a>
            ,{" "}
            <a href="http://www.theplantlist.org/" target="_blank">
              The Plant List
            </a>
            ), taxonomic standardization remains an error-prone and largely
            manual process. The need for an automated name resolution service
            has never been greater.
          </Typography>

          <br />
        </div>

        <div id="wheretnrs">
          <Typography variant="h5" gutterBottom align="justify">
            Where does the TNRS get its taxonomy?
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            The TNRS resolves names by consulting one or more
            publicly-available, expert-curated taxonomic databases. Thus, the
            TNRS does not provide its own opinions, but simply speeds up the
            process of researching the status of taxonomic names according to
            the authoritative sources. Although the TNRS allows users to choose
            which taxonomic sources they consult, in the end, the opinions
            provided are those of the selected sources, not the TNRS.
            <br />
            <br />
            Some of the names matched by the TNRS may be synonyms, depending on
            the source consulted. A synonym is a name that was published but is
            no longer considered correct, for any one of a variety of reasons.
            For example, if a different name for the same species was published
            earlier in a different country, then the earlier name must be used
            (i.e., it is the accepted name) and the later name is a synonym. In
            some cases, researchers may discover that a species once believed to
            be endemic to a single country is the same as a much more widespread
            species. In this case, the older name again becomes the accepted
            name and the later name a synonym.
            <br />
            <br />
            Taxonomists sometimes differ in their opinions as to which name
            should be accepted. In many cases, taxonomic sources such as
            Tropicos are able to choose among these opinions, labeling one name
            as accepted and the other names as synonyms. In some cases, no
            decision can as yet be made, in which case the status of name
            matched is unknown. The TNRS labels such names 'No opinion' and does
            not provide an accepted name. In such cases, it is up to the user to
            research the name further to determined if it should be used, and if
            not, which name should be used instead as the accepted name.
          </Typography>
          <br />
        </div>

        <div id="howtnrs">
          <Typography variant="h5" gutterBottom align="justify">
            How does the TNRS work?
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            The TNRS attempts to match each name submitted to a published
            scientific name in the TNRS database, correcting spelling if
            necessary. Once the name has been matched, if the name is a synonym
            it is converted to the correct (accepted) name. Spelling correction
            consists of the following steps:
            <br />
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
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
        </div>

        <div id="tnrsapi">
          <Typography variant="h5" gutterBottom align="justify">
            TNRS API
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            The{" "}
            <a href="https://github.com/ojalaquellueva/TNRSapi" target="_blank">
              new TNRS API
            </a>{" "}
            is a full-featured application built directly on top of the upgraded{" "}
            <a
              href="https://github.com/ojalaquellueva/TNRSbatch"
              target="_blank"
            >
              TNRS 5.0 search engine
            </a>
            . As the TNRS API functions handles all traffic between external
            applications and the TNRS search engine, all features available via
            the web interface are also available via the TNRS API. In addition,
            because the API is accessed programmatically, it can be used to
            process very large batches of names (exceeding the current limit of
            5000 names) much more rapidly by looping through large name lists in
            batches of 5000. The TNRS API can also be used by third-party
            developers to access TNRS content and search capabilities into their
            applications. For more information on the TNRS API and detailed
            instructions and examples of how to access the API in languages such
            as R and PHP, see documentation on the{" "}
            <a href="https://github.com/ojalaquellueva/TNRSapi" target="_blank">
              TNRS API GitHub repository
            </a>
          </Typography>
          <br />
        </div>

        <div id="rtnrs">
          <Typography variant="h5" gutterBottom align="justify">
            TNRS R package
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            Users who are familiar with the{" "}
            <a href="https://www.r-project.org/" target="_blank">
              R programming language
            </a>{" "}
            may prefer to access the TNRS using the{" "}
            <a href="https://github.com/EnquistLab/RTNRS" target="_blank">
              RTNRS R package
            </a>
            . Among other advantages, using RTNRS provides an efficient way to
            process large taxonomic lists which exceed limit of 5000 names per
            batch, as you can loop through the names in batches. All options
            currently available directly from the TNRS API or via the TNRS web
            user interface are also available via the R package.
          </Typography>
          <br />
        </div>

        <div id="sourcecode">
          <Typography variant="h5" gutterBottom align="justify">
            Source code
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            Source code for all TNRS components is publicly available from the
            following repositories:
            <br />
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            TNRS Search Engine:{" "}
            <a
              href="https://github.com/ojalaquellueva/TNRSbatch"
              target="_blank"
            >
              https://github.com/ojalaquellueva/TNRSbatch
            </a>
            <br />
            TNRS database:{" "}
            <a href="https://github.com/ojalaquellueva/tnrs_db" target="_blank">
              https://github.com/ojalaquellueva/tnrs_db
            </a>
            <br />
            TNRS name parser:{" "}
            <a
              href="https://github.com/GlobalNamesArchitecture/biodiversity"
              target="_blank"
            >
              https://github.com/GlobalNamesArchitecture/biodiversity
            </a>{" "}
            (=Global Names Biodiversity Parser - Ruby version)
            <br />
            TNRS API:{" "}
            <a href="https://github.com/ojalaquellueva/TNRSapi" target="_blank">
              https://github.com/ojalaquellueva/TNRSapi
            </a>
            <br />
            RTNRS R package:{" "}
            <a href="https://github.com/EnquistLab/RTNRS" target="_blank">
              https://github.com/EnquistLab/RTNRS
            </a>
            <br />
          </Typography>
          <br />
        </div>

        <div id="software">
          <Typography variant="h5" gutterBottom align="justify">
            Contributing software
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            Code from the following open source applications was used during the
            development of the TNRS:
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            <a
              href="http://www.cmar.csiro.au/datacentre/taxamatch.htm"
              target="_blank"
            >
              Original Taxamatch Algorithm
            </a>
            . Developed by{" "}
            <a
              href="https://en.wikipedia.org/wiki/Tony_Rees_(scientist)"
              target="_blank"
            >
              Tony Rees
            </a>
            .
            <br />
            <a
              href="http://www.silverbiology.com/products/taxamatch/"
              target="_blank"
            >
              Taxamatch PHP Web Service
            </a>
            . Developed by{" "}
            <a href="http://www.silverbiology.com/" target="_blank">
              {" "}
              Michael Giddens
            </a>
            .
            <br />
            <a
              href="https://github.com/GlobalNamesArchitecture/biodiversity"
              target="_blank"
            >
              Global Names Biodiversity Parser (Ruby version)
            </a>
            . Developed by{" "}
            <a
              href="https://www.researchgate.net/profile/Dmitry_Mozzherin"
              target="_blank"
            >
              Dmitry Mozzherin
            </a>
            .
          </Typography>
          <br />
        </div>

        <div id="contributors">
          <Typography variant="h5" gutterBottom align="justify">
            Contributors
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            The TNRS is a project of the{" "}
            <a href="http://bien.nceas.ucsb.edu/bien/" target="_blank">
              Botanical Information and Ecology Network
            </a>
            . The original iPlant TNRS was developed in collaboration with The
            iPlant Collaborative (now{" "}
            <a href="http://www.cyverse.org/" target="_blank">
              Cyverse
            </a>{" "}
            ) and the{" "}
            <a href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </a>
            . Numerous members of the taxonomic and informatics community
            provided advice, access to data, and source code.
          </Typography>

          <Typography variant="h6" gutterBottom align="justify">
            Project conception and direction
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            Brad Boyle{" "}
            <a href="https://eeb.arizona.edu/" target="_blank">
              University of Arizona
            </a>
            <br />
            Brian Enquist{" "}
            <a href="https://eeb.arizona.edu/" target="_blank">
              University of Arizona
            </a>
            <br />
            <br />
          </Typography>

          <Typography variant="h6" gutterBottom align="justify">
            Application development
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            Brad Boyle (
            <a href="https://github.com/ojalaquellueva/tnrs_db" target="_blank">
              TNRS database
            </a>
            ,{" "}
            <a href="https://github.com/ojalaquellueva/TNRSapi" target="_blank">
              API
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/ojalaquellueva/TNRSbatch"
              target="_blank"
            >
              TNRS batch/parallelization update
            </a>
            )
            <br />
            Naim Matasci (
            <a href="https://github.com/nmatasci/TNRSbatch" target="_blank">
              Original TNRS batch mode/parallelization
            </a>
            )
            <br />
            Dmitry Mozzherin (
            <a
              href="https://github.com/GlobalNamesArchitecture/biodiversity"
              target="_blank"
            >
              Name parser
            </a>
            )
            <br />
            Tony Rees (
            <a
              href="http://www.cmar.csiro.au/datacentre/taxamatch.htm"
              target="_blank"
            >
              Fuzzy matching module
            </a>
            )
            <br />
            Michael Giddens (
            <a
              href="http://www.silverbiology.com/products/taxamatch/"
              target="_blank"
            >
              Taxamatch PHP adaptation
            </a>
            )
            <br />
            George C. Barbosa (
            <a href="https://github.com/EnquistLab/TNRSweb" target="_blank">
              TNRSweb
            </a>{" "}
            Javascript/Node.js user interface)
            <br />
            Rohith Kumar Sajja (
            <a href="https://github.com/EnquistLab/TNRSweb" target="_blank">
              TNRSweb
            </a>{" "}
            Javascript/Node.js user interface)
            <br />
          </Typography>

          <Typography variant="h6" gutterBottom align="justify">
            Project direction and development - Original{" "}
            <a
              href="https://github.com/iPlantCollaborativeOpenSource/TNRS"
              target="_blank"
            >
              iPlant TNRS
            </a>{" "}
            (deprecated)
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            <a href="https://eeb.arizona.edu/" target="_blank">
              Brad Boyle
            </a>
            <br />
            <a href="https://eeb.arizona.edu/" target="_blank">
              Brian Enquist
            </a>
            <br />
            Juan Antonio Raygoza Garay
            <br />
            <a
              href="https://www.researchgate.net/profile/Dmitry_Mozzherin"
              target="_blank"
            >
              Dmitry Mozzherin
            </a>
            <br />
            <a
              href="https://en.wikipedia.org/wiki/Tony_Rees_(scientist)"
              target="_blank"
            >
              Tony Rees
            </a>{" "}
            <br />
            Nicole Hopkins
            <br />
            Zhenyuan Lu <br />
            Naim Matasci
            <br />
            Martha Narro
            <br />
            Shannon Oliver
            <br />
            William Piel
            <br />
            Jill Yarmchuk
            <br />
            iPlant staff
            <br />
          </Typography>

          <Typography variant="h6" gutterBottom align="justify">
            Collaborators
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            Bob Magill (
            <a href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </a>
            )<br />
            Chris Freeland (
            <a href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </a>
            )<br />
            Chuck Miller (
            <a href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </a>
            )<br />
            Peter Jorgensen (
            <a href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </a>
            )<br />
            Amy Zanne (
            <a href="http://www.umsl.edu/" target="_blank">
              University of Missouri, St. Louis
            </a>
            )<br />
            Peter Stevens (
            <a href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </a>
            )<br />
            Jay Paige (
            <a href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </a>
            )<br />
            Bob Peet (
            <a href="http://www.unc.edu/" target="_blank">
              University of North Carolina at Chapel Hill
            </a>
            )<br />
            Paul Morris (
            <a href="http://www.harvard.edu/" target="_blank">
              Harvard University
            </a>
            )<br />
            Alan Paton (
            <a href="http://www.kew.org/" target="_blank">
              Kew Royal Botanic Gardens
            </a>{" "}
            and the{" "}
            <a
              href="http://www.kew.org/science/directory/projects/IPNI.html"
              target="_blank"
            >
              International Plant Names Index
            </a>
            )<br />
            Michael Giddens (
            <a href="http://www.silverbiology.com/" target="_blank">
              www.silverbiology.com
            </a>
            )<br />
            David Remsen (
            <a href="http://www.gbif.org/" target="_blank">
              Global Biodiversity Information Facility
            </a>
            )<br />
            David Patterson (
            <a href="http://www.eol.org/" target="_blank">
              Encyclopedia of Life
            </a>
            )<br />
            Cam Webb (
            <a href="http://www.harvard.edu/" target="_blank">
              Harvard University
            </a>
            )<br />
          </Typography>

          <Typography variant="h6" gutterBottom align="justify">
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
          <Typography variant="h5" gutterBottom align="justify">
            Funding
          </Typography>

          <Typography variant="body2" align="justify">
            Funding provided by the National Science Foundation Plant
            Cyberinfrastructure Program (grant #DBI-0735191).
          </Typography>
          <br />
          <br />
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
