import { useState } from "react";
import _ from "lodash";

import { WarningTwoTone as WarningTwoToneIcon } from "@material-ui/icons";
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
} from "@material-ui/core";

import { WarningsPopover } from "./warnings";
import { SelectRowDialog } from "./select-row";
import { DetailsDialog } from "./details-dialog";
import { mkSourceLinks, mkAcceptedNameLinks } from "./links";
import { roundScore } from "../../src/actions";

// import Popup from "../Popup/Popup.jsx";

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
