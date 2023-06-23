import { useState } from "react";
import { useStyles } from "./styles";

import {
  Menu,
  MenuItem,
  IconButton,
  Link as MUILink,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

export function LowResMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className={classes.menuButton}
        onClick={handleClick}
        component="a"
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={MUILink} href="/about">
          About
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={MUILink}
          href="/instructions"
        >
          Instructions
        </MenuItem>
        <MenuItem onClick={handleClose} component={MUILink} href="/tnrsapi">
          Api
        </MenuItem>
        <MenuItem onClick={handleClose} component={MUILink} href="/sources">
          Sources
        </MenuItem>
        <MenuItem onClick={handleClose} component={MUILink} href="/cite">
          Cite
        </MenuItem>
      </Menu>
    </div>
  );
}
