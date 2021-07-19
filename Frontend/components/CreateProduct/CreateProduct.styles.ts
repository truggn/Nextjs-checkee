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
    minWidth: 750,
  },
  root: {
    minWidth: 275,
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
  helptext: {
    fontSize: 12,
    color: "#f44336",
    marginLeft: 16,
    marginTop: 5,
    letterSpacing: "revert",
  },
  tablepaginationroot: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  input: {
    display: "none",
  },
  message:{
    fontSize:12,
    color:'red',
    marginLeft:10,
    marginBottom:5,
  }
}));

export const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);
