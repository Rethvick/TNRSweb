import React from "react";
import {
  Popover,
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
  DialogContentText,
} from "@material-ui/core";

export function BestMatchSettingsPopper({ onClickSort, bestMatchingSetting }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogSort, setDialogSort] = React.useState(bestMatchingSetting);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button variant="contained" type="button" onClick={handleClick}>
        Best Match Settings
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
          <Box pt={1} pl={2} pb={0}>
            <FormControl>
              <FormGroup>
                <FormControlLabel
                  onClick={() => {
                    if (bestMatchingSetting !== "Highertaxa_score_order") {
                      setDialogOpen(true);
                      setDialogSort('Highertaxa_score_order')
                    }
                  }}
                  control={
                    <Checkbox
                      checked={
                        bestMatchingSetting === "Highertaxa_score_order"
                      }
                    />
                  }
                  label="Sort by Higher Taxonomy"
                />
                <FormControlLabel
                  onClick={() => {
                    if (bestMatchingSetting !== "Overall_score_order") {
                      setDialogOpen(true);
                      setDialogSort('Overall_score_order')
                    }
                  }}
                  control={
                    <Checkbox
                      checked={bestMatchingSetting === "Overall_score_order"}
                    />
                  }
                  label="Sort by Overall Score"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </Paper>
      </Popover>
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
              setDialogOpen(false);
              onClickSort(dialogSort);
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
