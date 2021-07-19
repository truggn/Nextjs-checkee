import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  //AddUser
  DialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
  dialogcontent: {
    padding: theme.spacing(2),
  },
  dialogtitle: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  div: {
    marginBottom: 20,
    alignItems: "center",
    textAlign: "center",
  },
  divider: {
    margin: "20px 0",
  },
  helptext: {
    fontSize: 12,
    color: "#f44336",
    marginLeft: 16,
    marginTop: 5,
    letterSpacing: "revert",
  },
  boolean: {
    color: "#f44336",
  },
  divimg: {
    width: 200,
    height: 200,
    overflow: "hidden",
  },
  img: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  divbutton: {
    position: "absolute",
    top: 54,
    left: 183,
  },
  divbig: {
    position: "relative",
    height: 130,
  },
}));
