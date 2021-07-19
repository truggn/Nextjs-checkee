import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  },
  table: {
    background: "white",
    overflow: "hidden",
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
  dialogTitle: {
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  gridColumn: {
    padding: theme.spacing(3),
  },
  gridItem: {
    marginRight: 20,
    marginBottom: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1000,
    opacity: "1.2 !important",
    color: "#fff",
  },
  tableRightBorder: {
    border: "1px solid rgba(224, 224, 224, 1)",
  },
}));

export const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
    height: 80,
    maxWidth: 100,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
  },
  imagesGrid: {
    position: "relative",
    "&:hover": {
      "& div": {
        opacity: 0.8,
        "& div": {
          opacity: 1,
          color: "red",
          cursor: "pointer",
        },
      },
    },
  },
  create: {
    opacity: 0.2,
  },
  input: {
    display: "none",
  },
  overlay: {
    transition: ".5s ease",
    opacity: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
}));
