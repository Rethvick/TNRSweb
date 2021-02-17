import { useState } from "react";
import { useStyles } from "./search-box.style";
import {
  Paper,
  TextField,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";

export function SearchBox({ onSearch, loadingStatus }) {
  const [input, setInput] = useState("");
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height={1}
      >
        <Box p={2}>
          <TextField
            rows={10}
            multiline
            lael="Multiline"
            fullWidth
            variant="outlined"
            label="Enter up to 5000 scientific names"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Box>
        <Box
          p={2}
          pt={0}
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Box>
            <Button
              disable={loadingStatus.toString()}
              onClick={() => onSearch(input)}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => setInput("")}
              variant="contained"
              color="secondary"
            >
              Clear
            </Button>
          </Box>
          <Box flexGrow={1} />
          <Box>{loadingStatus && <CircularProgress size={30} />}</Box>
        </Box>
      </Box>
    </Paper>
  );
}
