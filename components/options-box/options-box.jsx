//import { useState } from "react";
import { useStyles } from "./options-box.style";
import {
  Paper,
  Typography,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Checkbox,
  Slider,
  Switch,
} from "@material-ui/core";

export function OptionsBox() {
  const classes = useStyles();
  return (
    <Paper>
      <Box py={2}>
        <Box p={2}>
          <Box mb={1}>
            <InputLabel>Processing Mode</InputLabel>
          </Box>
          <FormControl variant="outlined" fullWidth>
            <Select value={0}>
              <MenuItem value={0}>Perform name resulution</MenuItem>
              <MenuItem value={1}>Parse names only</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box p={2}>
          <FormLabel component="legend">Matching type</FormLabel>
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="Allow partial matching"
          />
          <Typography id="fuzzy-slider" gutterBottom>
            Sensitivity
          </Typography>
          <Box px={2}>
            <Slider
              defaultValue={0.05}
              aria-labelledby="fuzzy-slider"
              step={0.01}
              min={0.05}
              max={1}
              marks
              valueLabelDisplay="auto"
            />
          </Box>
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
