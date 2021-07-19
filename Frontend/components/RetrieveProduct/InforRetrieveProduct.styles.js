const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles((theme) => ({
  // main retrieve
  mainRetrieve: {},

  // main header
  itemContainer: {},

  // item header
  itemHeader: {
    [theme.breakpoints.down("md")]: {
      marginBottom: 10,
    },
  },

  // paper
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  // paper 1
  paper1: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  // paper 2
  paper2: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  },

  // title header
  titleHeader: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 25,
    color: "#424242",
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
    },
  },

  // title retrive
  title: {
    color: "#455a64",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },

  // title retrive 2
  titleCode2: {
    marginLeft: 30,
    color: "#12679a",
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      marginLeft: 16,
    },
  },
  // title retrive
  titleName: {
    marginLeft: 21,
    color: "#12679a",
    fontWeight: "bold",
    textTransform: "uppercase",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      marginLeft: 10,
    },
  },

  swiper: {
    width: "100%",
    height: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      height: "auto",
    },
  },

  // images
  images: {
    width: "100%",
    height: "auto",
    borderRadius: 10,
    cursor: "pointer",
    "&:hover": {
      opacity: 0.5,
    },
  },

  // card
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  },

  // description title
  desTitle: {
    color: "#455a64",
    [theme.breakpoints.up("xs")]: {
      fontSize: 15,
    },
  },
}));

export default useStyles;
