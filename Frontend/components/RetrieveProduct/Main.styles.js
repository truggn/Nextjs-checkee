const { makeStyles } = require("@material-ui/core");

const useStyles = makeStyles((theme) => ({
  // root
  root: {
    margin: "30px 0",
    flexGrow: 1,
  },

  // main
  main: {
    [theme.breakpoints.down("md")]: {
      margin: "0 10px",
    },
  },
}));

export default useStyles;
