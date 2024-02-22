import { Layout } from "../components";

import { Typography, List, ListItem, Link } from "@material-ui/core";

function InstructionsApp() {
  return (
    <>
      {/* head is not working */}
      <Layout>
        <Typography variant="h3" align="justify" display="block" gutterBottom>
          How To Use The TNRS
        </Typography>
        <div id="howuse">
          <Typography variant="h5" gutterBottom align="justify">
            Follow these steps to use the TNRS:
            <br />
          </Typography>
          <List>
            <ListItem>
              <Typography variant="body2">
                1. <strong>Enter your names</strong>. Paste your list of names
                into the "Scientific names to check box", one name per line.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                2. <strong>Choose your settings</strong>. For most users, the default settings are generally best. However, if you only want to parse your names into their component parts, without matching or resolving, then set "Processing Mode" to "Perform Name Resolution".
                By default, setting "Taxonomic sources" includes only one global taxonomic source, WFO.
                However, some users may prefer to select WCVP, a different global taxonomic source.
                Please note that WCVP includes vascular plants only (flowering plants, conifers, ferns, clubmosses and firmosses) whereas WFO also includes bryophytes (mosses, liverworts and hornworts) in addition to vascular plants.
                In general, we do not recommend using more than one taxonomic source at the same time, as different taxonomic opinions may result in synonymous spelling variants of the same name being treated as separate accepted species.
                If >1 taxonomic source is used, name resolution results should be reviewed carefully. Also note that source CACT covers family Cactaceae only.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                3. <strong>Submit!</strong> Process your names by pressing the
                Submit button.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                4. <strong>Inspect</strong>. Always inspect your results before
                downloading if (a) any <Link href="/warnings">warnings</Link> are
                displayed in the first column of the results table (click on the{" "}
                <Link href="/warnings">warning</Link> symbol for details), or (b) the
                TNRS found >1 match to a name. The latter will be indicated by
                the hyperlinked text "(+n more)" after the name in column "Name
                Matched". Use the provided links to research all potential
                matches, selecting an alternative match as the best name if
                appropropriate. If a <Link href="/warnings">warning</Link> indicates
                that a better higher taxonomic match is available for a
                submitted name, you should inspect the alternative very
                carefully, as this may indicate that a better matching genus or
                family is correct, but the specific epithet was fuzzy matched to
                an unrelated taxon in a different genus or family.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                5. <strong>Adjust best match algorithm (if desired)</strong>.
                You can adjust the Best Match algorithm on the fly by clicking
                on the "Best Match Settings" control and selecting "Sort by
                Higher Taxonomy" instead of the default "Sort by Overall Score".
                However, in most cases you should instead inspect and change
                names individually, as changing "Best Match Settings" will
                discard any manual selections you have made. However, if many
                names have the <Link href="/warnings">warning</Link> "Better higher
                taxonomic match available", you may find it helpful to download
                your names twice and compare the results: once using the default
                "Sort by Overall Score" method, and a second time using "Sort by
                Higher Taxonomy".
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                6. <strong>Download data</strong>. After you have inspected your
                results and made changes, if any, you can download your results
                by clicking on the "Download Data" control. You will be given
                the option to download your file as comma-delimitted or
                tab-delimitted, and can choose between download all matches or
                the best match only for each name.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                7. <strong>Download metadata</strong>. Use the "Download
                settings" button to download a summary of the settings, source,
                & application versions used to process your names. We recommend
                you include this information in your publication, as the same
                names processed using different settings, versions or sources
                may be resolved differently. Reporting this information is
                important for repeatability of research results.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                8. <strong>Cite your sources</strong>. Please cite the TNRS and
                all taxonomic sources used in any publication which includes
                taxonomic names resolved using the TNRS. See{" "}
                <Link href="/cite">Cite</Link> for details.
              </Typography>
            </ListItem>
          </List>
        </div>
      </Layout>
    </>
  );
}

export default InstructionsApp;
