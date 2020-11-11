import React from "react";
import {
  Popper,
  Button,
  Box,
  Paper,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

export function BestMatchSettingsPopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button variant="contained" type="button" onClick={handleClick}>
        Best Match Settings
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <Paper elevation={3}>
          <Box pt={1} pl={2} pb={0}>
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Sort by Higher Taxonomy"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Sort by Overall Score"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Paper>
      </Popper>
    </div>
  );
}
