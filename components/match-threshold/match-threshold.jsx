import React from "react";
import {
  Popover,
  Button,
  Box,
  Paper,
  Typography,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";

export function MatchThresholdPopper({
  onChangeMatchingThreshold,
  matchingThreshold,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [tmpMatchingThreshold, setTmpMatchingThreshold] = React.useState(
    matchingThreshold
  );

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleApplyThreshold = (e) => {
    // setDialogSort(e.target.value);
    setDialogOpen(true);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button variant="contained" type="button" onClick={handleClick}>
        Match {matchingThreshold}
      </Button>
      <Popover
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper elevation={3}>
          <Box pb={3} pt={3} px={4} width="300px">
            <Typography>Select the matching threshold</Typography>
            <Slider
              defaultValue={0.53}
              step={0.01}
              marks
              min={0}
              max={1}
              valueLabelDisplay="auto"
              onChange={(e, v) => setTmpMatchingThreshold(v)}
              value={tmpMatchingThreshold}
            />
            <Button
              disabled={tmpMatchingThreshold === matchingThreshold}
              variant="contained"
              color="primary"
              onClick={handleApplyThreshold}
            >
              Apply
            </Button>
          </Box>
        </Paper>
      </Popover>
      {/* TODO: move this to a separate file, it is now duplicated */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{"Action Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            All your previous changes will be overridden, are you sure you want
            to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setAnchorEl(null);
              setDialogOpen(false);
              onChangeMatchingThreshold(tmpMatchingThreshold)
            }}
            color="primary"
            autoFocus
          >
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
