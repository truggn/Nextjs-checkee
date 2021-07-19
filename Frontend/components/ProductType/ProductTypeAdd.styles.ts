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
    marginTop: 10,
  },
  gridItem: {
    marginRight: 20,
    marginBottom: 20,
    paddingLeft: 0,
  },
  gridList: {
    flexWrap: "nowrap",
    height: 125,
    margin: "0!important",
    transform: "translateX(-20px)",
    color: theme.palette.text.secondary,
    overflowY: "auto",
  },
  tile: {
    padding: "0!important",
    minWidth: "125px",
    maxWidth: "125px",
    margin: theme.spacing(1),
    "& div": {
      borderRadius: "10px",
    },
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    borderRadius: "10px",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  title: {
    color: "rbga(0,0,0,0.5)",
  },
  addTile: {
    borderRadius: "10px",
    background: "rgba(0,0,0,0.05)",
    marginRight: "10px",
    "& div": {
      display: "flex",
      justifyContent: "center",
      alignSelf: "center",
      alignContent: "center",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      height: 500,
      overflowY: "scroll",
      cursor: "pointer",
      "&::-webkit-scrollbar": {
        width: 10,
        backgroundColor: "#F5F5F5",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: 10,
        backgroundImage:
          "-webkit-gradient(linear,left bottom, left top,color-stop(0.44,#c5cae9))",
      },
    },

    listItem: {
      padding: 5,
      " &:hover": {
        backgroundColor: "#e3e7fc",
      },
    },
  })
);
