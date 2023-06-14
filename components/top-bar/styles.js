import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  homeLink: {
    textDecoration: "none !important",
  },
  menuButton: {
    marginRight: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  container: {
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0),
    },
  },
}));
