import { useState } from "react";
import _ from "lodash";

import {
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableCell,
  TableBody,
  TableSortLabel,
  Link,
  Table,
} from "@material-ui/core";

import DetailsDialog from "./parse-details-dialog";
import { TablePaginationActions } from "../";
import { getComparator, stableSort } from "../../actions";

export function ParseTable({ tableData }) {
  // states
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

  const renderRow = (row) => {
    let rowData = getRowData(row.ID);
    return (
      <TableRow key={row.ID}>
        <TableCell>{row.Name_submitted} </TableCell>
        <TableCell>
          {row.Genus +
            " " +
            row.Specific_epithet +
            " " +
            row.Infraspecific_rank +
            " " +
            row.Infraspecific_epithet +
            " " +
            row.Infraspecific_rank_2 +
            " " +
            row.Infraspecific_epithet_2}
        </TableCell>
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
          <Table size="small">
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
  // to save space we define a vector with the names of the columns
  let tableColumns = [
    ["Name_submitted", "Name Submitted"],
    ["Genus", "Genus"],
    ["Author", "Author"],
    ["Unmatched_terms", "Unmatched Terms"],
  ];

  // we render the names using a map
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
        {
          // here we add the previously rendered table cells
          tableColumnsJsx
        }
        <TableCell>Details</TableCell>
      </TableRow>
    </TableHead>
  );
}
