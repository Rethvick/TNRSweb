
import { useState } from "react";
import _ from "lodash";

import {
  WarningTwoTone as WarningTwoToneIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";

import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableCell,
  TableBody,
  TableSortLabel,
  Link,
  IconButton,
  TextField,
  Table,
} from "@material-ui/core";




// shows the dialog with details of each row
export default function DetailsDialog(props) {
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

