import { useState } from "react";
import _ from "lodash";
import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Switch,
} from "@material-ui/core";
import { Table } from "react-bootstrap";

// shows the dialog with details of each row
function ParsedNamesDialog(props) {

  const { onClose, open, row } = props;

  // make a copy of the object being displayed
  let dataToDisplay = { ...row };

  // delete rows
  delete dataToDisplay.ID;
  
  return (
    <Dialog aria-labelledby="dtitle" open={open} maxWidth="lg">
      <DialogTitle id="dtitle">Details of the selected name</DialogTitle>
      <Box m={4} mt={0}>
        <TableContainer>
          <Table aria-label="change selection table">
            <TableHead>
              <TableRow>
                <TableCell>Key</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(dataToDisplay).map(([key, value], idx) => (
                <TableRow key={idx}>
                  <TableCell>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Dialog>
  );
}

// TODO: receive a call back function to set the id
export function ParseTable({tableData}) {

   // states
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [dataPopUpOpen, setDataPopUpOpen] = useState(false);
  const [popUpDetails, setPopUpDetails] = useState({});

  const handleClickClose = () => {
    setPopUpOpen(false);
    setDataPopUpOpen(false);
  };

  const getRowData = (id) => {
    return tableData.filter((row) => row.ID == id)[0];
  };

  const renderRow = (row) => {
    let rowData = getRowData(row.ID);

    return (
      <TableRow key={row.ID}>
        <TableCell>{row.Name_submitted} </TableCell>
        <TableCell>{row.Genus}</TableCell>
        <TableCell>{row.Author}</TableCell>
        <TableCell>{row.Unmatched_terms}</TableCell>
        <TableCell>
          {
            <Link
              href="#"
              onClick={() => {
                setDataPopUpOpen(true);
                setPopUpDetails(rowData);
              }}
            >
              Details
            </Link>
          }
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <Box m={2} mt={0}>
        <TableContainer>
          <Table aria-label="change selection table">
            <TableHead>
              <TableRow>
                <TableCell>Name Submitted</TableCell>
                <TableCell>Taxon Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Unmatched terms</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableData.map(renderRow)}</TableBody>
          </Table>
        </TableContainer>
      </Box>

      <ParsedNamesDialog
        open={dataPopUpOpen}
        onClose={handleClickClose}
        row={popUpDetails}
      />
    </>
  );
}
