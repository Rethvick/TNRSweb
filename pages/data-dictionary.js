import { Layout } from "../components";
import { useState, useEffect } from "react";


import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,

} from "@material-ui/core";

import { requestDataDictionary } from "../actions/";

function AboutApp() {
  //
  const [dataDictionary, setDataDictionary] = useState([]);
  // retrieve the version information
  useEffect(() => {
    async function fetchData() {
      let dd = await requestDataDictionary();
      setDataDictionary(dd)
    }
    fetchData();
  }, []);

  return (
    <>
      <Layout>
        <TableContainer component={Paper}>
          <Table aria-label="data dictionary table">
            <TableHead>
              <TableRow>
                <TableCell>Column Name</TableCell>
                <TableCell>Data Type</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataDictionary.map((row, k) => (
                <TableRow key={k}>
                  <TableCell>{row.col_name}</TableCell>
                  <TableCell>{row.data_type}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </>
  );
}

export default AboutApp;
