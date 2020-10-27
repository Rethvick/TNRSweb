import { useState } from "react";
// import { useStyles } from "./result-table.style";
import {
  Paper,
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

function SelectRowDialog(props) {
  //
  const { onClose, open, rows, handleChangeSelectedRow } = props;
  //
  //
  return (
    <Dialog aria-labelledby="dtitle" open={open}>
      <DialogTitle id="dtitle">Change selected name</DialogTitle>
      <Box m={4} mt={0}>
        <TableContainer>
          <Table aria-label="change selection table">
            <TableHead>
              <TableRow>
                <TableCell>Name Submitted</TableCell>
                <TableCell>Name Matched</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Overall Score</TableCell>
                <TableCell>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.unique_id}>
                  <TableCell>{row.Name_submitted}</TableCell>
                  <TableCell>{row.Name_matched}</TableCell>
                  <TableCell>
                    <Link href={name.Accepted_name_url}>
                      {row.Source.toUpperCase()}
                    </Link>
                  </TableCell>
                  <TableCell>{row.Overall_score}</TableCell>
                  <TableCell>
                    <Switch
                      checked={row.selected}
                      onChange={() => handleChangeSelectedRow(row)}
                    />
                  </TableCell>
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
  // filter table data where selected == true
  let tableDataSelected = tableData.filter((row) => row.selected == true);

  const getRows = (id) => {
    return tableData.filter((row) => row.ID == id);
  };

  //const classes = useStyles();
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [popUpRows, setPopUpRows] = useState([]);

  const handleClickClose = () => {
    setPopUpOpen(false);
  };

  const renderTNRS = (name, index) => {
    return (
      <tr
        key={index}
        onClick={() => {
          setPopUpRows(getRows(name.ID));
          console.log(getRows(name.ID));
          //onChangeSelectedRow(getRows(name.ID)[1]);
          setPopUpOpen(true);
        }}
      >
        <td>{name.ID}</td>
        <td>{name.Name_submitted}</td>
        <td>{name.Name_matched}</td>
        <td>
          <a href={name.Accepted_name_url}>{name.Source.toUpperCase()}</a>
        </td>
        <td>{name.Overall_score}</td>
        <td>{name.Taxonomic_status}</td>
        <td>{name.Accepted_name}</td>
      </tr>
    );
  };

  return (
    <>
      <Paper>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name Submitted</th>
              <th>Name Matched</th>
              <th>Source</th>
              <th>Overall Score</th>
              <th>Taxonomic Status</th>
              <th>Accepted Name</th>
            </tr>
          </thead>
          <tbody>{tableDataSelected.map(renderTNRS)}</tbody>
        </Table>
      </Paper>
      <SelectRowDialog
        open={popUpOpen}
        onClose={handleClickClose}
        rows={popUpRows}
        handleChangeSelectedRow={onChangeSelectedRow}
      />
    </>
  );
}
