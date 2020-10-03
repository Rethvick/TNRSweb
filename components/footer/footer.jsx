import { useStyles } from "./footer.style";

import { Container, Link, Typography, Box } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://tnrs.iplantcollaborative.org/">
        TNRS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export function Footer() {
  return (
    <footer>
      <Box py={10} bgcolor="gray">
        <Container>
          <Copyright />
        </Container>
      </Box>
    </footer>
  );
}
