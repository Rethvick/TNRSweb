import { Layout } from "../components";
import Head from "next/head";

import { Typography } from "@material-ui/core";

function AboutApp() {
  return (
    <>
      <Head>
        <title>TNRS - Sources</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography variant="h1" align="center">Sources</Typography>
      </Layout>
    </>
  );
}
export default AboutApp;
