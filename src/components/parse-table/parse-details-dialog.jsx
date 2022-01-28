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
    <Dialog open={open} maxWidth="lg">
      <DialogTitle>Name submited: {dataToDisplay.Name_submitted}</DialogTitle>
      <Box m={4} mt={0}>
        <TableContainer>
          <Table size='small'>
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

