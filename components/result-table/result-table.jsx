//import { useState } from "react";
import { useStyles } from "./result-table.style";
import {
  Paper,
  Box
} from "@material-ui/core";

export function ResultTable({ tableData }) {
  const classes = useStyles();
  return (
    <Paper>
      <Box p={2}>
        <div>Result: {tableData}</div>
      </Box>
    </Paper>
  );
}
