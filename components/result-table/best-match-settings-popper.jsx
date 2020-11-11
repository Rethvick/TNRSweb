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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@material-ui/core";

export function BestMatchSettingsPopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button variant="contained" type="button" onClick={handleClick}>
        Best Match Settings
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <Paper elevation={3}>
          <Box pt={1} pl={2} pb={0}>
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  onClick={() => setDialogOpen(true)}
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{"Action Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All your previous changes will be overridden, are you sure you want
            to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
