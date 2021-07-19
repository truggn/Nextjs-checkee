import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root1: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  button: {
    margin: theme.spacing(1),
    // fontSize: "small"
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
  dialogTitle: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  closebutton: {
    position: "absolute",
    right: 2,
    top: 3,
  },
  div: {
    marginBottom: 20,
    alignItems: "center",
    textAlign: "center",
  },
  boolean: {
    color: "#f44336",
  },
  helptext: {
    fontSize: 12,
    color: "#f44336",
    marginLeft: 16,
    marginTop: 5,
    letterSpacing: "revert",
  },
  DialogActions: {
    margin: 0,
    padding: theme.spacing(1),
    marginTop: 15,
  },
  unknown1: {
    height: 400,
    width: "100%",
  },
  unknown2: {
    display: "flex",
    height: "100%",
  },
  unknown3: {
    flexGrow: 2,
  },
  namefunction: {
    width: 170,
    paddingLeft: 50,
  },
  space: {
    marginRight: 5,
  },
  spacetextfiled: {
    width: 64,
    marginRight: 5,
  },
  button1: {
    marginRight: 5,
    height: 40,
  },
  unknown4: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
  tablecell: {
    padding: "0 5px",
  },
  tablechild: {
    position: "relative",
  },
  iconChild: {
    position: "absolute",
    top: 22,
    left: 10,
  },
}));
