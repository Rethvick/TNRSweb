//import { useState } from "react";
import { useStyles } from "./options-box.style";
import {
  Paper,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Switch,
} from "@material-ui/core";

export function OptionsBox() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Box py={2}>
        <Box p={2}>
          <Box mb={1}>
            <InputLabel>Processing Mode</InputLabel>
          </Box>
          <FormControl variant="outlined" fullWidth>
            <Select value={0}>
              <MenuItem value={0}>Perform name resolution</MenuItem>
              <MenuItem value={1}>Parse names only</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box p={2} pt={0}>
          <FormLabel component="legend">Sources</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={true} />}
              label="TROPICOS"
            />
            <FormControlLabel control={<Switch checked={true} />} label="TPL" />
            <FormControlLabel
              control={<Switch checked={true} />}
              label="USDA"
            />
          </FormGroup>
        </Box>
      </Box>
    </Paper>
  );
}
