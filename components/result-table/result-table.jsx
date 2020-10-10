import { useState } from "react";
import { useStyles } from "./result-table.style";
import {
  Paper,
  Box
} from "@material-ui/core";
import { Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as ReactBootStrap from "react-bootstrap";
import Popup from "../Popup/Popup.jsx";

export function ResultTable({ tableData }) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const renderTNRS = (name, index) => {
    return(
      <tr key={index}>
        <td>{name.ID}</td>
        <td onClick={() => { setOpenPopup(true); }}>{name.Name_submitted}</td> 
        <td>{name.Name_matched}</td>
        <td><a href={name.Accepted_name_url}>{name.Source.toUpperCase()}</a></td>
        <td>{name.Overall_score}</td>
        <td>{name.Taxonomic_status}</td>
        <td>{name.Accepted_name}</td>
      </tr>

    )
  }

  const columns = [
    { dataField: "ID", text: "ID"},
    { dataField: "Name_submitted", text: "Name Submitted"},
    { dataField: "Name_matched", text: "Name Matched"},
    { dataField: "Source", text: "Source", sort: true},
    { dataField: "Overall_score", text: "Overall Score"},
    { dataField: "Taxonomic_status", text: "Taxonomic Status"},
    { dataField: "Accepted_name", text: "Accepted Name"}
  ]
  return (
    <Paper>
      <Box p={2}>
        {/* <div>Result: {tableData}</div> */}
      </Box>
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
        <tbody>
          {tableData.map(renderTNRS)}
        </tbody>
      </Table>

      <BootstrapTable 
        keyField="ID"
        data={tableData}
        columns={columns}
        pagination={paginationFactory()}
      />

      <Popup
        title="Employee Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        children={tableData.map(renderTNRS)}
      >
      </Popup>

    </Paper>
    
  );
}
