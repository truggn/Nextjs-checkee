import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    // minWidth: 750,
  },
  root_userType: {
    // minWidth: 275,
  },
  button: {
    margin: theme.spacing(1),
    // fontSize: "small"
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
  tableRightBorder: {
    border: "1px solid rgba(224, 224, 224, 1)",
  },
}));
