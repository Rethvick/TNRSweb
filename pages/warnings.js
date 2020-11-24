import { Layout } from "../components";
import Head from "next/head";

import { Typography } from "@material-ui/core";

function AboutApp() {
  return (
    <>
      <Head>
        <title>TNRS - Warnings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Typography variant="h1" align="center">Warnings</Typography>
      </Layout>
    </>
  );
}
export default AboutApp;
