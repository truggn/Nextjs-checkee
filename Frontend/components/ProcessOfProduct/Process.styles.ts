import {
  makeStyles,
  Theme,
  useTheme,
  lighten,
  createStyles,
} from "@material-ui/core/styles";
export const useStyles = makeStyles((theme: Theme) => ({
  containerTask: {
    // width: 300,
    marginBottom: 8,
    borderRadius: 6,
    border: "2px dotted lightgrey",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  },
  listTask: {
    padding: 0,
  },
  headerColumn: {
    padding: "0 25px",
    textTransform: "uppercase",
  },
  containerConlumn: {
    margin: 8,
    border: "1px solid lightgrey",
    borderRadius: 6,
    // width: 350,
    display: "flex",
    flexDirection: "column",
  },
  titleColumn: {
    padding: 8,
  },
  headColumn: {
    display: "flex",
    position: "relative",
  },
  taskListColumn: {
    padding: 8,
    flexGrow: 1,
  },
  iconColumn: {
    position: "absolute",
    top: 11,
    right: 15,
  },
  containerExample: {
    width: "auto",
    display: "flex",
    height: "auto",
  },
  Typography: {
    marginLeft: 10,
  },
  Card: {
    minWidth: 275,
  },
  Column: {
    background: "white",
    border: " 1px solid lightgray",
    borderRadius: 6,
  },
  input: {
    display: "none",
  },
  toolbarroot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  toolbartitle: {
    flex: "1 1 100%",
  },
  tablepaginationroot: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
