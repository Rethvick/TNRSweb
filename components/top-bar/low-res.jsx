import { useState } from "react";
import { useStyles } from "./styles";

import {
  Menu,
  MenuItem,
  IconButton,
  Link as MUILink,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

export function LowResMenu({ menuLinks }) {
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

        {menuLinks.map((item, k) =>
          <MenuItem onClick={handleClose} component={MUILink} href={item.href}>
            {item.name}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
