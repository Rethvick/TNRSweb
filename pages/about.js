import { Layout } from "../components";

import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Link,
} from "@material-ui/core";

import { requestCollaborators } from "../actions/";

const apiServer = process.env.apiServer;

function AboutApp({ collaboratorsAvailable }) {
  return (
    <>
      <Layout>
        <Typography variant="h3" align="justify" display="block" gutterBottom>
          About the TNRS
        </Typography>
        <Typography variant="h5" align="justify">
          Table of Contents
        </Typography>
        <br />
        <Typography variant="body2" gutterBottom align="justify">
          <Link href="#whattnrs">What is the TNRS?</Link>
          <br />
          <Link href="#wheretnrs">Where does the TNRS get its taxonomy?</Link>
          <br />
          <Link href="#tnrsapi">TNRS API</Link>
          <br />
          <Link href="#rtnrs">TNRS R package</Link>
          <br />
          <Link href="#sourcecode">Source code</Link>
          <br />
          <Link href="#software">Contributing software</Link>
          <br />
          <Link href="#contributors">Contributors</Link>
          <br />
          <Link href="#funding">Funding</Link>
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
            provided are those of the selected sources, not the TNRS. For a list
            of current taxanomic sources, see{" "}
            <Link href="/sources">Sources</Link>.
          </Typography>
          <br />
        </div>
        <div id="tnrsapi">
          <Typography variant="h5" gutterBottom align="justify">
            TNRS API
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            The TNRS web interface uses the{" "}
            <Link
              href="https://github.com/ojalaquellueva/TNRSapi"
              target="_blank"
            >
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
            <Link
              href="https://github.com/ojalaquellueva/TNRSapi"
              target="_blank"
            >
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
            <Link
              href="https://github.com/ojalaquellueva/TNRSbatch"
              target="_blank"
            >
              https://github.com/ojalaquellueva/TNRSbatch
            </Link>
            <br />
            TNRS database:{" "}
            <Link
              href="https://github.com/ojalaquellueva/tnrs_db"
              target="_blank"
            >
              https://github.com/ojalaquellueva/tnrs_db
            </Link>
            <br />
            TNRS name parser:{" "}
            <Link
              href="https://github.com/GlobalNamesArchitecture/biodiversity"
              target="_blank"
            >
              https://github.com/GlobalNamesArchitecture/biodiversity
            </Link>{" "}
            (=Global Names Biodiversity Parser - Ruby version)
            <br />
            TNRS API:{" "}
            <Link
              href="https://github.com/ojalaquellueva/TNRSapi"
              target="_blank"
            >
              https://github.com/ojalaquellueva/TNRSapi
            </Link>
            <br />
            RTNRS R package:{" "}
            <Link href="https://github.com/EnquistLab/RTNRS" target="_blank">
              https://github.com/EnquistLab/RTNRS
            </Link>
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
            <Link
              href="http://www.cmar.csiro.au/datacentre/taxamatch.htm"
              target="_blank"
            >
              Original Taxamatch Algorithm
            </Link>
            . Developed by{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Tony_Rees_(scientist)"
              target="_blank"
            >
              Tony Rees
            </Link>
            .
            <br />
            <Link
              href="http://www.silverbiology.com/products/taxamatch/"
              target="_blank"
            >
              Taxamatch PHP Web Service
            </Link>
            . Developed by{" "}
            <Link href="http://www.silverbiology.com/" target="_blank">
              {" "}
              Michael Giddens
            </Link>
            .
            <br />
            <Link
              href="https://github.com/GlobalNamesArchitecture/biodiversity"
              target="_blank"
            >
              Global Names Biodiversity Parser (Ruby version)
            </Link>
            . Developed by{" "}
            <Link
              href="https://www.researchgate.net/profile/Dmitry_Mozzherin"
              target="_blank"
            >
              Dmitry Mozzherin
            </Link>
            .
          </Typography>
          <br />
        </div>
        <div id="contributors">
          <Typography variant="h5" gutterBottom align="justify">
            Contributors
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            TNRS was first developed by the iPlant Collaborative Tree of Life
            Project, in collaboration with the{" "}
            <Link href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </Link>{" "}
            and the{" "}
            <Link href="http://bien.nceas.ucsb.edu/bien/" target="_blank">
              Botanical Information and Ecology Network
            </Link>
            . Later development was supported by{" "}
            <Link href="https://www.cyverse.org/" target="_blank">
              Cyverse
            </Link>
            , led by the Botanical Information and Ecology Network and funded by
            a{" "}
            <Link href="https://www.nsf.gov/" target="_blank">
              National Science Foundation
            </Link>{" "}
            <Link
              href="https://www.nsf.gov/cise/harnessingdata/"
              target="_blank"
            >
              Harnessing the Data Revolution
            </Link>{" "}
            Grant HDR 1934790. Numerous members of the taxonomic and informatics
            community provided advice , access to data, and source code.
          </Typography>
          <Typography variant="h6" gutterBottom align="justify">
            Project conception and direction
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            Brad Boyle{" "}
            <Link href="https://eeb.arizona.edu/" target="_blank">
              University of Arizona
            </Link>
            <br />
            Brian Enquist{" "}
            <Link href="https://eeb.arizona.edu/" target="_blank">
              University of Arizona
            </Link>
            <br />
          </Typography>
          <Typography variant="h6" gutterBottom align="justify">
            Application development
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            Brad Boyle (
            <Link
              href="https://github.com/ojalaquellueva/tnrs_db"
              target="_blank"
            >
              TNRS database
            </Link>
            ,{" "}
            <Link
              href="https://github.com/ojalaquellueva/TNRSapi"
              target="_blank"
            >
              API
            </Link>{" "}
            and{" "}
            <Link
              href="https://github.com/ojalaquellueva/TNRSbatch"
              target="_blank"
            >
              TNRS batch/parallelization update
            </Link>
            )
            <br />
            Naim Matasci (
            <Link href="https://github.com/nmatasci/TNRSbatch" target="_blank">
              Original TNRS batch mode/parallelization
            </Link>
            )
            <br />
            Dmitry Mozzherin (
            <Link
              href="https://github.com/GlobalNamesArchitecture/biodiversity"
              target="_blank"
            >
              Name parser
            </Link>
            )
            <br />
            Tony Rees (
            <Link
              href="http://www.cmar.csiro.au/datacentre/taxamatch.htm"
              target="_blank"
            >
              Fuzzy matching module
            </Link>
            )
            <br />
            Michael Giddens (
            <Link
              href="http://www.silverbiology.com/products/taxamatch/"
              target="_blank"
            >
              Taxamatch PHP adaptation
            </Link>
            )
            <br />
            George C. Barbosa (
            <Link href="https://github.com/EnquistLab/TNRSweb" target="_blank">
              TNRSweb
            </Link>{" "}
            Javascript/Node.js user interface)
            <br />
            Rohith Kumar Sajja (
            <Link href="https://github.com/EnquistLab/TNRSweb" target="_blank">
              TNRSweb
            </Link>{" "}
            Javascript/Node.js user interface)
            <br />
          </Typography>
          <Typography variant="h6" gutterBottom align="justify">
            Project direction and development - Original{" "}
            <Link
              href="https://github.com/iPlantCollaborativeOpenSource/TNRS"
              target="_blank"
            >
              iPlant TNRS
            </Link>{" "}
            (deprecated)
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            <Link href="https://eeb.arizona.edu/" target="_blank">
              Brad Boyle
            </Link>
            <br />
            <Link href="https://eeb.arizona.edu/" target="_blank">
              Brian Enquist
            </Link>
            <br />
            Juan Antonio Raygoza Garay
            <br />
            <Link
              href="https://www.researchgate.net/profile/Dmitry_Mozzherin"
              target="_blank"
            >
              Dmitry Mozzherin
            </Link>
            <br />
            <Link
              href="https://en.wikipedia.org/wiki/Tony_Rees_(scientist)"
              target="_blank"
            >
              Tony Rees
            </Link>{" "}
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
            <Link href="https://eeb.arizona.edu/" target="_blank">
              Brian Maitner
            </Link>
            <br />
            <Link href="https://cmerow.github.io/" target="_blank">
              Cory Merow
            </Link>
            <br />
            Bob Magill (
            <Link href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </Link>
            )<br />
            Chris Freeland (
            <Link href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </Link>
            )<br />
            Chuck Miller (
            <Link href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </Link>
            )<br />
            Peter Jorgensen (
            <Link href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </Link>
            )<br />
            Amy Zanne (
            <Link href="http://www.umsl.edu/" target="_blank">
              University of Missouri, St. Louis
            </Link>
            )<br />
            Peter Stevens (
            <Link href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </Link>
            )<br />
            Jay Paige (
            <Link href="http://www.mobot.org/" target="_blank">
              Missouri Botanical Garden
            </Link>
            )<br />
            Bob Peet (
            <Link href="http://www.unc.edu/" target="_blank">
              University of North Carolina at Chapel Hill
            </Link>
            )<br />
            Paul Morris (
            <Link href="http://www.harvard.edu/" target="_blank">
              Harvard University
            </Link>
            )<br />
            Alan Paton (
            <Link href="http://www.kew.org/" target="_blank">
              Kew Royal Botanic Gardens
            </Link>{" "}
            and the{" "}
            <Link
              href="http://www.kew.org/science/directory/projects/IPNI.html"
              target="_blank"
            >
              International Plant Names Index
            </Link>
            )<br />
            Michael Giddens (
            <Link href="http://www.silverbiology.com/" target="_blank">
              www.silverbiology.com
            </Link>
            )<br />
            David Remsen (
            <Link href="http://www.gbif.org/" target="_blank">
              Global Biodiversity Information Facility
            </Link>
            )<br />
            David Patterson (
            <Link href="http://www.eol.org/" target="_blank">
              Encyclopedia of Life
            </Link>
            )<br />
            Cam Webb (
            <Link href="http://www.harvard.edu/" target="_blank">
              Harvard University
            </Link>
            )<br />
          </Typography>
          <Typography variant="h6" gutterBottom align="justify">
            Institutions
          </Typography>
          {/* Collaborators */}
          <List>
            {collaboratorsAvailable.map((c, idx) => (
              <div key={idx}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <div>
                      <img
                        style={{ objectFit: "scale-down" }}
                        height="50"
                        width="50"
                        src={apiServer + c.logo_path}
                      />
                    </div>
                  </ListItemIcon>
                  <ListItemText>
                    <Typography gutterBottom={true} variant="h6">
                      {c.collaboratorNameFull}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {c.description}
                    </Typography>
                    <Link href={c.collaboratorUrl} size="small" color="primary">
                      Learn More
                    </Link>
                  </ListItemText>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <br />
          <br />
        </div>
        <div id="funding">
          <Typography variant="h5" gutterBottom align="justify">
            Funding
          </Typography>
          <Typography variant="body2" align="justify">
            Funding provided by the National Science Foundation Plant
            Cyberinfrastructure Program (grant #DBI-0735191) and National
            Science Foundation Harnessing the Data Revolution Grant HDR 1934790
            to Brian J. Enquist.
          </Typography>
          <br />
          <br />
        </div>
      </Layout>
    </>
  );
}

AboutApp.getInitialProps = async () => {
  let collaborators = await requestCollaborators();
  return { collaboratorsAvailable: collaborators };
};

export default AboutApp;
