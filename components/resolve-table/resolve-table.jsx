import { useState } from "react";
import _ from "lodash";

import {
  WarningTwoTone as WarningTwoToneIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
//
import {
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TablePagination,
  TableSortLabel,
  Link,
  IconButton,
  TextField,
} from "@material-ui/core";

import { WarningsPopover } from "./warnings";
import { SelectRowDialog } from "./select-row";
import { DetailsDialog } from "./resolve-details-dialog";
import { mkSourceLinks, mkAcceptedNameLinks } from "./links";
import { roundScore } from "../../actions";

export function ResolveTable({ tableData, onChangeSelectedRow }) {
  // filter table data where selected == true
  let tableDataSelected = tableData.filter((row) => row.selected == true);
  // get all rows with a particular ID
  const getRows = (id) => {
    return tableData.filter((row) => row.ID == id);
  };
  // get a single row
  const getRowData = (id) => {
    return tableDataSelected.filter((row) => row.ID == id)[0];
  };
  // state
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [dataPopUpOpen, setDataPopUpOpen] = useState(false);
  const [popUpRows, setPopUpRows] = useState([]);
  const [popUpDetails, setPopUpDetails] = useState({});
  //
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //For enhanced table head
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  //
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //
  const handleClickClose = () => {
    setPopUpOpen(false);
    setDataPopUpOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
    let allRows = getRows(row.ID);
    let rowData = getRowData(row.ID);
    return (
      <TableRow key={row.unique_id}>
        <TableCell>
          {row.Warnings && <WarningsPopover warnings={row.Warnings} />}
        </TableCell>
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
              {" (+" + (allRows.length - 1) + " more)"}
            </Link>
          )}
        </TableCell>
        <TableCell>{mkSourceLinks(row)}</TableCell>
        <TableCell>{roundScore(row.Overall_score)}</TableCell>
        <TableCell>{row.Taxonomic_status}</TableCell>
        <TableCell>
          {row.Accepted_name + " " + row.Accepted_name_author}{" "}
          {mkAcceptedNameLinks(row)}
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
      <Box mx={2}>
        <TableContainer>
          <Table size="small">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(tableDataSelected, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(renderRow)}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={tableDataSelected.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
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
        row={popUpDetails}
      />
    </>
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
            active={orderBy === "Warnings"}
            direction={orderBy === "Warnings" ? order : "asc"}
            onClick={createSortHandler("Warnings")}
          >
            <WarningTwoToneIcon fontSize="small" />
          </TableSortLabel>
        </TableCell>

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
            active={orderBy === "Name_matched"}
            direction={orderBy === "Name_matched" ? order : "asc"}
            onClick={createSortHandler("Name_matched")}
          >
            Name Matched
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={orderBy === "Source"}
            direction={orderBy === "Source" ? order : "asc"}
            onClick={createSortHandler("Source")}
          >
            Source
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={orderBy === "Overall_score"}
            direction={orderBy === "Overall_score" ? order : "asc"}
            onClick={createSortHandler("Overall_score")}
          >
            Overall Score
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={orderBy === "Taxonomic_status"}
            direction={orderBy === "Taxonomic_status" ? order : "asc"}
            onClick={createSortHandler("Taxonomic_status")}
          >
            Taxonomic Status
          </TableSortLabel>
        </TableCell>

        <TableCell>
          <TableSortLabel
            active={orderBy === "Accepted_name"}
            direction={orderBy === "Accepted_name" ? order : "asc"}
            onClick={createSortHandler("Accepted_name")}
          >
            Accepted Name
          </TableSortLabel>
        </TableCell>

        <TableCell>Details</TableCell>
      </TableRow>
    </TableHead>
  );
}
