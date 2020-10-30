import { useState } from "react";
import _ from "lodash";
// import { useStyles } from "./result-table.style";
//
//
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

// import Popup from "../Popup/Popup.jsx";

// receives a row and generate the links to the sources
const mkLinks = (row) => {
  let sources = row.Source.split(",");
  let links = row.Name_matched_url.split(";");
  //
  return _.zip(sources, links).map((pair) => (
    <Link
      key={row.unique_id}
      href="#"
      onClick={() => window.open(pair[1], "_blank")}
    >
      {" "}
      {pair[0].toUpperCase()}
    </Link>
  ));
};

// FIXME: move to a separate file
// shows the dialog to allow the user to select a diff row
function SelectRowDialog(props) {
  //
  const { onClose, open, rows, handleChangeSelectedRow } = props;
  //
  //
  return (
    <Dialog aria-labelledby="dtitle" open={open} maxWidth="lg">
      <DialogTitle id="dtitle">Change selected name</DialogTitle>
      <Box m={4} mt={0}>
        <TableContainer>
          <Table aria-label="change selection table">
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Name Matched</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Overall Score</TableCell>
                <TableCell>Author Matched</TableCell>
                <TableCell>Author Score</TableCell>
                <TableCell>Accepted Name</TableCell>
                <TableCell>Unmatched Terms</TableCell>
                <TableCell>Taxonomic Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.unique_id}>
                  <TableCell>
                    <Switch
                      checked={row.selected}
                      onChange={() => handleChangeSelectedRow(row)}
                    />
                  </TableCell>
                  <TableCell>
                    {row.Name_matched + " " + row.Accepted_name_author}
                  </TableCell>
                  <TableCell>{mkLinks(row)}</TableCell>
                  <TableCell>{row.Overall_score}</TableCell>
                  <TableCell>{row.Author_matched}</TableCell>
                  <TableCell>{row.Author_score}</TableCell>
                  <TableCell>
                    {row.Accepted_name + " " + row.Accepted_name_author}
                  </TableCell>
                  <TableCell>{row.Unmatched_terms}</TableCell>
                  <TableCell>{row.Taxonomic_status}</TableCell>
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

// FIXME: move to a separate file
// shows the dialog with details of each row
function DetailsDialog(props) {
  //
  const { onClose, open, rows } = props;

  var x = rows[0];
  var l = _.size(x);

  var data = [];
  for (var i = 0; i < l; i++) {
    var obj = new Object();
    obj.key = Object.keys(x)[i];
    obj.value = Object.values(x)[i];
    data.push(obj);
  }

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
              {data.map((row) => (
                <TableRow key={row.unique_id}>
                  <TableCell>{row.key}</TableCell>
                  <TableCell>{row.value}</TableCell>
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
export function ResultTable({ tableData, onChangeSelectedRow }) {
  //const classes = useStyles();

  // filter table data where selected == true
  let tableDataSelected = tableData.filter((row) => row.selected == true);

  // get all rows with a particular ID
  const getRows = (id) => {
    return tableData.filter((row) => row.ID == id);
  };

  // get a single row
  const getRowData = (id) => {
    return tableDataSelected.filter((row) => row.ID == id);
  };

  // state
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [dataPopUpOpen, setDataPopUpOpen] = useState(false);
  const [popUpRows, setPopUpRows] = useState([]);
  const [popUpDetails, setPopUpDetails] = useState([]);

  const handleClickClose = () => {
    setPopUpOpen(false);
    setDataPopUpOpen(false);
  };

  const renderRow = (row) => {
    let allRows = getRows(row.ID);
    let rowData = getRowData(row.ID);
    return (
      <TableRow key={row.unique_id}>
        <TableCell>{row.ID}</TableCell>
        <TableCell>{row.Name_submitted} </TableCell>
        <TableCell>
          {row.Name_matched + " " + row.Accepted_name_author}{" "}
          {allRows.length > 1 && (
            <Link
              href="#"
              onClick={() => {
                setPopUpRows(allRows);
                setPopUpOpen(true);
              }}
            >
              {"(+" + (allRows.length - 1) + " more)"}
            </Link>
          )}
        </TableCell>
        <TableCell>{mkLinks(row)}</TableCell>
        <TableCell>{row.Overall_score}</TableCell>
        <TableCell>{row.Taxonomic_status}</TableCell>
        <TableCell>
          {row.Accepted_name + " " + row.Accepted_name_author}
        </TableCell>
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
                <TableCell>ID</TableCell>
                <TableCell>Name Submitted</TableCell>
                <TableCell>Name Matched</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Overall Score</TableCell>
                <TableCell>Taxonomic Status</TableCell>
                <TableCell>Accepted Name</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableDataSelected.map(renderRow)}</TableBody>
          </Table>
        </TableContainer>
      </Box>

      <SelectRowDialog
        open={popUpOpen}
        onClose={handleClickClose}
        rows={popUpRows}
        handleChangeSelectedRow={onChangeSelectedRow}
      />

      <DetailsDialog
        open={dataPopUpOpen}
        onClose={handleClickClose}
        rows={popUpDetails}
      />
    </>
  );
}
