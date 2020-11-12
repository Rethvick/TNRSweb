import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Warning as WarningIcon } from "@material-ui/icons";
import {
  Popover,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

import {
  shortText2LongText,
  shortText2DetailedExplanation,
} from "../../src/actions";

import { zip } from "lodash";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export function WarningsPopover(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const open = Boolean(anchorEl);
  const classes = useStyles();
  return (
    <>
      <Box
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={handleDialogOpen}
      >
        <WarningIcon />
      </Box>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box p={2}>
          <Typography variant="subtitle2">Information</Typography>
          <Box my={1}>
            {shortText2LongText(props.warnings).map((message) => (
              <Typography>- {message}</Typography>
            ))}
          </Box>
          <Typography variant="caption">
            Click on the warning to get more information.
          </Typography>
        </Box>
      </Popover>
      <WarningDialog
        onClickClose={handleDialogClose}
        open={dialogOpen}
        warnings={props.warnings}
      />
    </>
  );
}

function WarningDialog(props) {
  const longText = shortText2LongText(props.warnings);
  const detailedExplanation = shortText2DetailedExplanation(props.warnings);

  return (
    <Dialog open={props.open} onClose={props.onClickClose}>
      <DialogTitle>{"Warnings"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {zip(longText, detailedExplanation).map(([text, explanation]) => (
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>
                {text}
              </Typography>
              <Typography>{explanation}</Typography>
            </Box>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClickClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
