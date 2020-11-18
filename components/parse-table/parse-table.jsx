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

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;
  const [inputPage, setInputPage] = useState(page + 1);

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
    setInputPage(1);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
    setInputPage(page);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
    setInputPage(page + 2);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    setInputPage(Math.max(0, Math.ceil(count / rowsPerPage)));
  };

  return (
    <>
      <Box display="flex">
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          <KeyboardArrowLeft />
        </IconButton>
      </Box>
      <Box width={150}>
        <TextField
          value={inputPage}
          onKeyDown={(e) => {
            // when the user presses enter key=13
            if (e.keyCode === 13) {
              let maxPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
              if (inputPage < 1) {
                onChangePage(e, 0);
                setInputPage(1);
              } else if (inputPage > maxPage) {
                onChangePage(e, maxPage);
                setInputPage(maxPage + 1);
              } else {
                onChangePage(e, inputPage - 1);
              }
            }
          }}
          onChange={(e) => setInputPage(e.target.value)}
          variant="outlined"
          size="small"
        />
      </Box>
      <Box display="flex">
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          <LastPageIcon />
        </IconButton>
      </Box>
    </>
  );
}

// TODO: receive a call back function to set the id
export function ParseTable({ tableData }) {
  // states
  // FIXME: this is not being used, we should remove
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [dataPopUpOpen, setDataPopUpOpen] = useState(false);
  const [popUpDetails, setPopUpDetails] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //For enhanced table head
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickClose = () => {
    setPopUpOpen(false);
    setDataPopUpOpen(false);
  };

  const getRowData = (id) => {
    return tableData.filter((row) => row.ID == id)[0];
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // FIXME: move these functions to a separate container
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

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
      <Box m={2} mb={0}>
        <TableContainer>
          <Table aria-label="change selection table">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(tableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(renderRow)}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <TableSortLabel
            active={orderBy === "Name_submitted"}
            direction={orderBy === "Name_submitted" ? order : "asc"}
            onClick={createSortHandler("Name_submitted")}
          >
            Name Submitted
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={orderBy === "Genus"}
            direction={orderBy === "Genus" ? order : "asc"}
            onClick={createSortHandler("Genus")}
          >
            Taxon Name
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={orderBy === "Author"}
            direction={orderBy === "Author" ? order : "asc"}
            onClick={createSortHandler("Author")}
          >
            Source
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={orderBy === "Unmatched_terms"}
            direction={orderBy === "Unmatched_terms" ? order : "asc"}
            onClick={createSortHandler("Unmatched_terms")}
          >
            Unmatched Terms
          </TableSortLabel>
        </TableCell>

        <TableCell>Details</TableCell>
      </TableRow>
    </TableHead>
  );
}
