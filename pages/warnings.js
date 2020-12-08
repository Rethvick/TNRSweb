import { Layout } from "../components";
import Head from "next/head";

import {
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableSortLabel,
  Link,
  IconButton,
  TextField,
  Typography,
  Paper
} from "@material-ui/core";
import { WarningSharp } from "@material-ui/icons";

/*
Convert Excel to JSON using the tool on the website:
http://beautifytools.com/excel-to-json-converter.php
*/

const warnings = {
  "Lookup": [
      {
          "Numeric code": "1",
          "Short text code": "Partial",
          "Long text code": "Partial match",
          "Detailed explanation": "Name matched is a higher taxon than the name submitted."
      },
      {
          "Numeric code": "2",
          "Short text code": "Ambiguous",
          "Long text code": "Ambiguous match",
          "Detailed explanation": "More than one name with the same score and acceptance."
      },
      {
          "Numeric code": "4",
          "Short text code": "HigherTaxa",
          "Long text code": "Better higher taxonomic match available",
          "Detailed explanation": "Another name with lower overall score has a better matching higher taxon."
      },
      {
          "Numeric code": "8",
          "Short text code": "Overall",
          "Long text code": "Better overall match available",
          "Detailed explanation": "Another name in different higher taxon has better overall score."
      }
  ],
  "Combinations": [
      {
          "1": "1",
          "Combined code": "1",
          "Combined text": "[Partial]"
      },
      {
          "2": "2",
          "Combined code": "2",
          "Combined text": "[Ambiguous]"
      },
      {
          "4": "4",
          "Combined code": "4",
          "Combined text": "[HigherTaxa]"
      },
      {
          "8": "8",
          "Combined code": "8",
          "Combined text": "[Overall]"
      },
      {
          "1": "1",
          "2": "2",
          "Combined code": "3",
          "Combined text": "[Partial] [Ambiguous]"
      },
      {
          "1": "1",
          "4": "4",
          "Combined code": "5",
          "Combined text": "[Partial] [HigherTaxa]"
      },
      {
          "1": "1",
          "8": "8",
          "Combined code": "9",
          "Combined text": "[Partial] [Overall]"
      },
      {
          "2": "2",
          "4": "4",
          "Combined code": "6",
          "Combined text": "[Ambiguous] [HigherTaxa]"
      },
      {
          "2": "2",
          "8": "8",
          "Combined code": "10",
          "Combined text": "[Ambiguous] [Overall]"
      },
      {
          "4": "4",
          "8": "8",
          "Combined code": "12",
          "Combined text": "[HigherTaxa] [Overall]"
      },
      {
          "1": "1",
          "2": "2",
          "4": "4",
          "Combined code": "7",
          "Combined text": "[Partial] [Ambiguous] [HigherTaxa]"
      },
      {
          "1": "1",
          "2": "2",
          "8": "8",
          "Combined code": "11",
          "Combined text": "[Partial] [Ambiguous] [Overall]"
      },
      {
          "1": "1",
          "4": "4",
          "8": "8",
          "Combined code": "13",
          "Combined text": "[Partial] [HigherTaxa] [Overall]"
      },
      {
          "2": "2",
          "4": "4",
          "8": "8",
          "Combined code": "14",
          "Combined text": "[Ambiguous] [HigherTaxa] [Overall]"
      },
      {
          "1": "1",
          "2": "2",
          "4": "4",
          "8": "8",
          "Combined code": "15",
          "Combined text": "[Partial] [Ambiguous] [HigherTaxa] [Overall]"
      }
  ]
};

function AboutApp() {
  return (
    <>
      <Head>
        <title>TNRS - Warnings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Typography variant="h3" align="justify" display="block" gutterBottom="True">Warnings</Typography>

      <Typography variant="body1" align="justify" display="block" gutterBottom="True">Refer to the 
      following table for a detailed explanation of warnings for the name 
      resolution on TNRS <br/><br/></Typography>
      
      <Box mx={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" width={"15%"}>Numeric code</TableCell>
                <TableCell align="center" width={"15%"}>Short text code</TableCell>
                <TableCell align="center" width={"25%"}>Long text code</TableCell>
                <TableCell align="center" width={"55%"}>Detailed explanation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warnings.Lookup.map((row) => (
                <TableRow key={row["Numeric code"]}>
                  <TableCell align="center">{row["Numeric code"]}</TableCell>
                  <TableCell align="center">{row["Short text code"]}</TableCell>
                  <TableCell align="center">{row["Long text code"]}</TableCell>
                  <TableCell align="justify">{row["Detailed explanation"]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      </Layout>
    </>
  );
}
export default AboutApp;
