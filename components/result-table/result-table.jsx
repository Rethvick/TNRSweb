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
  Link,
  IconButton,
  TextField,
} from "@material-ui/core";

import { WarningsPopover } from "./warnings";
import { SelectRowDialog } from "./select-row";
import { DetailsDialog } from "./details-dialog";
import { mkSourceLinks, mkAcceptedNameLinks } from "./links";
import { roundScore } from "../../src/actions";

// import Popup from "../Popup/Popup.jsx";

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;
  const [inputPage, setInputPage] = useState(page);

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
                setInputPage(maxPage+1);
              } else {
                onChangePage(e, inputPage-1);
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

export function ResultTable({ tableData, onChangeSelectedRow }) {
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
      <Box m={2} mt={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <WarningTwoToneIcon />
                </TableCell>
                <TableCell>Name Submitted</TableCell>
                <TableCell>Name Matched</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Overall Score</TableCell>
                <TableCell>Taxonomic Status</TableCell>
                <TableCell>Accepted Name</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableDataSelected
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
