import { useState } from "react";
import { useStyles } from "./search-box.style";
import { Paper, TextField, Box, Button } from "@material-ui/core";

export function SearchBox({ onSearch }) {
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
        <Box px={2}>
          <TextField
            rows={5}
            multiline
            fullWidth
            variant="outlined"
            label="Species Names"
            onChange={(e) => setInput(e.target.value)}
          />
        </Box>
        <Box px={2}>
          <Button
            onClick={() => onSearch(input)}
            variant="contained"
            color="primary"
          >
            Resolve
          </Button>
          <Button variant="contained" color="secondary">
            Clear
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
