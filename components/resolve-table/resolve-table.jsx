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
  TableSortLabel,
  Link,
} from "@material-ui/core";

import { TablePaginationActions } from "../";
import { WarningsPopover } from "./warnings";
import { SelectRowDialog } from "./select-row";
import { DetailsDialog } from "./resolve-details-dialog";
import { mkSourceLinks, mkAcceptedNameLinks } from "./links";
import { roundScore } from "../../actions";
import { getComparator, stableSort } from "../../actions";

export function ResolveTable({ tableData, onChangeSelectedRow }) {
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
          {row.Name_matched + " " + row.Canonical_author}{" "}
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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  let tableColumns = [
    ["Name_submitted", "Name Submitted"],
    ["Name_matched", "Name Matched"],
    ["Source", "Source"],
    ["Overall_score", "Overall Score"],
    ["Taxonomic_status", "Taxonomic Status"],
    ["Accepted_name", "Accepted Name"],
  ];

  let tableColumnsJsx = tableColumns.map((names, idx) => {
    return (
      <TableCell key={idx}>
        <TableSortLabel
          active={orderBy === names[0]}
          direction={orderBy === names[0] ? order : "asc"}
          onClick={createSortHandler(names[0])}
        >
          {names[1]}
        </TableSortLabel>
      </TableCell>
    );
  });

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
        {
          // here we add the previously rendered table cells
          tableColumnsJsx
        }
        <TableCell>Details</TableCell>
      </TableRow>
    </TableHead>
  );
}
