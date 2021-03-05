import { Layout } from "../components";
import { Typography} from "@material-ui/core";

export default function ContributeApp() {
  return (
    <>
      <Layout>
        <Typography variant="h3" align="justify" display="block" gutterBottom>
          Becoming a data provider
        </Typography>
        <div id="whoshouldjoin">
          <Typography variant="h5" gutterBottom align="justify">
            Who can become a data provider for the TNRS?
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            Curators of databases of high quality plant taxonomy (taxonomy for
            any group of organisms goverened by the ICN, or International Code
            of Nomenclature for algae, fungi, and plants) are encouraged to make
            their names and synonymy available via the TNRS. Doing so will make
            it easier for researchers to standardize their names according to
            your taxonomy. We welcome both synonymized regional checklists and
            taxonomy from monographic treatments of species within families or
            other higher taxa. Potential data providers should begin by
            contacting us at{" "}
            <a href="mailto:support@tnrs.biendata.org" target="_blank">
              support@tnrs.biendata.org
            </a>
            .
          </Typography>
          <br />
          <Typography variant="h5" gutterBottom align="justify">
            How do I share my taxonomy?
          </Typography>
          <Typography variant="body2" gutterBottom align="justify">
            TNRS developers will work with you to develop the most effective
            method of sharing your taxonomic information. Exposing your data via
            the TNRS requires that we import your names and synonymy to a local
            database optimized for rapid access by our name resolution search
            engine. Although we can perform one-time imports, for actively
            curated database, regularly schedule ingests using a web service or
            live database link are the best way to ensure up-to-date
            representation of your data.
          </Typography>
          <br />
          <Typography variant="h5" gutterBottom align="justify">
            TNRS Simple Darwin Core export format
          </Typography>
          <Typography variant="body2" gutterBottom={true} align="justify">
            The simplest way to share your taxonomic information with the TNRS
            is as an export structured according to the TNRS Simple Darwin Core
            format. Taxonomic data formatted in this way can be added
            immediately to the TNRS database using our existing Darwin Core
            import utility. Detailed instructions on how to prepare you data in
            this format are provided in the document{" "}
            <a href="tnrs_dwc_template_instructions.txt">
              TNRS Simplified Darwin Core format
            </a>
            .
          </Typography>
        </div>
      </Layout>
    </>
  );
}
