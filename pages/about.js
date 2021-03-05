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
        <Typography variant="body2" gutterBottom align="justify">
          <Link href="#newtnrs">New TNRS!</Link>
          <br />
          <Link href="#whattnrs">What is the TNRS?</Link>
          <br />
          <Link href="#howtnrs">How does the TNRS work?</Link>
          <br />
          <Link href="#wheretnrs">Where does the TNRS get its taxonomy?</Link>
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
        <div id="newtnrs">
          <Typography variant="h5" gutterBottom align="justify">
            Welcome to the new TNRS!
          </Typography>

          <Typography variant="body2" gutterBottom align="justify">
            TNRS Version 5.0, released on Feb. 24, 2021, is a major upgrade of
            the original Taxonomic Name Resolution Service released in 2013.
            Much of the application has been completely redesigned to simplify
            maintenance, speed development, improve performance, and provide
            access to a wider community of users. Major changes include:
            <List>
              <ListItem>
                <Typography variant="body2">
                  <strong>
                    New, full-featured <a href="/tnrsapi">API</a>.
                  </strong>
                  The API available with earlier versions of the TNRS provided
                  access to only a subset of the features available to users of
                  the TNRS web interface. As of TNRS 5.0, all major application
                  logic is now embedded within the core services layers, and the
                  API has been reconfigured as an intermediate layer which
                  handles all requests to the core services. The full suite of
                  TNRS capabilities are available at all entry points, whether
                  calling the API directly, or indirectly via external
                  applications such as the{" "}
                  <a href="/tnrsapi#rtnrs">TNRS R package</a> or this web
                  interface.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  <strong> Parallel processing for faster performance.</strong>{" "}
                  Requests to the TNRS API are futher managed by a controller
                  layer which breaks large requests into multiple batches that
                  can be distributed simultaneously across multiple processors.
                  This architecture provides processing speeds up to 30x faster
                  than the original TNRS.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  <strong>Mobile friendly</strong> The TNRS web interface was
                  completely rebuilt using React JS, a lightweight, client-side
                  architecture that runs as easily on mobile devices as it does
                  on desktop machines.
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  <strong>New database.</strong> The TNRS database was rebuilt
                  in July 2020 with updated taxonomic reference information from
                  all <a href="/sources">taxonomic sources</a>. New sources will
                  be added in 2021, with updates increased to a quarterly basis.
                </Typography>
              </ListItem>
            </List>
          </Typography>
          <br />
        </div>

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
        <div id="howtnrs">
          <Typography variant="h5" gutterBottom align="justify">
            How does the TNRS work?
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            The TNRS attempts to match each name submitted to a published
            scientific name in the TNRS database, correcting spelling if
            necessary. Once matched, any synonyms are converted to the correct
            (accepted) name. Both the matched name and the accepted name are
            returned by the TNRS. This process is performed in the following
            steps:
            <br />
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            <List>
              <ListItem>
                <Typography variant="body2">
                  1. <strong>Parse</strong>. The TNRS first parses (splits) the
                  name into its components parts. Components of a species name
                  include genus, specific epithet, and authority, if included.
                  If the name is a subspecies or variety, the parser will also
                  separate the rank indicator ("var.", "subsp.", "sbsp.", etc.)
                  and the subspecific epithet. The parser also detects and
                  separates standard botanical annotations such as "sp. nov."
                  (new species) and "ined." (unpublished name) as well as
                  indicators of uncertainty such as "cf." ("compare with") and
                  "aff." (affinis, related to but not the same). Finally, any
                  unrecognized components are saved as "Unmatched_Terms".
                  Separating "contaminants" from standard components increases
                  the chance that the TNRS will match the intended name. Parsing
                  is performed by the{" "}
                  <a href="http://gni.globalnames.org/" target="_blank">
                    Global Names
                  </a>{" "}
                  <a
                    href="https://github.com/GlobalNamesArchitecture/biodiversity"
                    target="_blank"
                  >
                    Biodiversity Name Parser
                  </a>
                  .
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  2. <strong>Match</strong>. The parsed name components are
                  again matched against known scientific names in the TNRS
                  database. The TNRS attempts both exact matching and fuzzy
                  matching using the{" "}
                  <a
                    href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0107510"
                    target="_blank"
                  >
                    Taxamatch
                  </a>{" "}
                  taxonomic fuzzy matching algorithm. The Taxamatch algorithm
                  speeds up fuzzy matching by searching within the taxonomic
                  hierarchy. For example, once a genus has been identified, only
                  species within that genus are searched.
                </Typography>
              </ListItem>
              The steps in name matching are illustrated in the figure below:
              <br />
              <br />
              <img src="/name_matching.png" />
              <br />
              <br />
              <ListItem>
                <Typography variant="body2">
                  3. <strong>Correct</strong>. Once the TNRS has discovered the
                  most likely intended scientific name, it will then examine the
                  taxonomic status of that name. If the name is an outdated
                  synonym of another name, the TNRS will return the "Accepted"
                  (correct) name along with matched name, according to the
                  taxonomic sources selected by the user. For some erroneous
                  names, the TNRS will return only the matched name but no
                  accepted name. This can happen is the accepted name is missing
                  or unknown in the selected taxonomic database, or if the name
                  matched is nomenclaturally invalid (e.g., "Invalid",
                  "Illegitimate"), in which case an accepted name may not exist.
                </Typography>
              </ListItem>
              The steps in name correction are illustrated in the figure below:
              <br />
              <br />
              <img src="/taxonomic_status.png" />
              <br />
              <br />
              <ListItem>
                <Typography variant="body2">
                  3. <strong>Select Best Match</strong>. Different sources can
                  sometimes return different names as the single correct
                  (accepted) name. Even if you are using only one taxonomic
                  source, a submitted name can sometimes fuzzy match to multiple
                  names with exactly the same match score. In such cases, the
                  TNRS uses a conservative "Best Match Algorithm" to sort the
                  names in descending order of match quality, preferring, for
                  example, synonyms which have been corrected to a different
                  accepted name over the same name labelled as accepted. After
                  applying these rules, the TNRS marks the top-ranked name as
                  the single best match. In such cases, the TNRS will alert you
                  that multiple matches were found, allowing you to select an
                  alternative match if preferred. We recommend that users
                  examine all alternative matches rather than accepting
                  uncritically the TNRS's choice of "Best Match".
                </Typography>
              </ListItem>
            </List>
          </Typography>
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
            of current taxanomic sources, see <a href="/sources">Sources</a>.
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
                    <Typography gutterBottom variant="h6">
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
