import { Link, Typography, Box, Grid, Divider } from "@material-ui/core";
import { ContainerLG } from "../";

function TNRSFooter() {
  return (
    <>
      <Box mt={4} />
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={12} md={5}>
          <Box display="flex" justifyContent="center">
            <Box
              pb={4}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Box display="flex" alignItems="left">
                <img
                  style={{ objectFit: "contain" }}
                  src="/logo_highres.png"
                  height="80"
                  width="80"
                ></img>
                <Box>
                  <Typography variant="h3">TNRS</Typography>
                  <Typography variant="h6">
                    Taxonomic Name Resolution Service
                  </Typography>
                </Box>
              </Box>
              <Box mt={1}>
                An online tool for the standardization of global taxonomic
                names.
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={1} alignItems="center">
            <Grid xs={4} item>
              <Box display="flex">
                <Box flexGrow={1}></Box>
                <Box>
                  <img src="/bien.png" height="35"></img>
                </Box>
              </Box>
            </Grid>
            <Grid xs={8} item>
              The Botanical Information and Ecology Network
            </Grid>
            <Grid xs={4} item>
              <Box display="flex">
                <Box flexGrow={1}></Box>
                <Box>
                  <img src="/uoa.png" height="50"></img>
                </Box>
              </Box>
            </Grid>
            <Grid xs={8} item>
              The University of Arizona
            </Grid>
            <Grid xs={4} item>
              <Box display="flex">
                <Box flexGrow={1}></Box>
                <Box>
                  <img src="/nsf.png" height="50"></img>
                </Box>
              </Box>
            </Grid>
            <Grid xs={8} item>
              National Science Foundation
            </Grid>
            <Grid xs={4} item>
              <Box display="flex">
                <Box flexGrow={1}></Box>
                <Box>
                  <img src="/mbg.png" height="50"></img>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              Missouri Botanical Garden
            </Grid>
            <Grid item xs={4}>
              <Box display="flex">
                <Box flexGrow={1}></Box>
                <Box>
                  <img src="/nceas.png" height="50"></img>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              National Center for Ecological Analysis and Synthesis
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export function Footer() {
  return (
    <footer>
      <ContainerLG>
        <Divider/>
        <TNRSFooter />
      </ContainerLG>
    </footer>
  );
}
