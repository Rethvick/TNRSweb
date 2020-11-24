import { Box } from "@material-ui/core";
import Head from "next/head";

import { TopBar, Footer, ContainerLG } from "../";

export function Layout(props) {
  return (
    <>
      <Head>
        <title>TNRS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box>
          <TopBar />
        </Box>
        <Box flexGrow={1} my={2}>
          <ContainerLG>{props.children}</ContainerLG>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
