import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  root: {
    // minWidth: 275,
    width: "100%",
    overflowX: "auto",
    height: 300,
    flexGrow: 1,
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

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper_Form: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table_Form: {
    background: "white",
  },
  root_Form: {
    minWidth: 275,
  },
  button_Form: {
    margin: theme.spacing(1),
    // fontSize: "small"
  },
  iconButton_Form: {
    marginLeft: theme.spacing(1),
  },
  dialogTitle: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  grid: {
    padding: "20px 20px 20px 0px",
  },
  gridItem: {
    marginBottom: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    opacity: "1.2 !important",
    color: "#fff",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  // backdrop: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   color: '#fff',
  // },
}));