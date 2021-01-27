import {
  Box,
  Dialog,
  DialogTitle,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Switch,
} from "@material-ui/core";

import { mkSourceLinks } from "./links";
import { roundScore } from "../../src/actions";

// shows the dialog to allow the user to select a diff row
export function SelectRowDialog(props) {
  //
  const { onClose, open, rows, handleChangeSelectedRow } = props;
  // function to sort by default best match order
  const sortByMatchOrder = (a, b) => {
    return b['Overall_score'] - a['Overall_score']
  }
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
              {rows.sort(sortByMatchOrder).map((row) => (
                <TableRow key={row.unique_id}>
                  <TableCell>
                    <Switch
                      checked={row.selected}
                      onChange={() => handleChangeSelectedRow(row)}
                    />
                  </TableCell>
                  <TableCell>
                    {row.Name_matched + " " + row.Canonical_author}
                  </TableCell>
                  <TableCell>{mkSourceLinks(row)}</TableCell>
                  <TableCell>{roundScore(row.Overall_score)}</TableCell>
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
