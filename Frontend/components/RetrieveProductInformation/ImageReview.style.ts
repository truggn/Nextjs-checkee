import {
  makeStyles,
  Theme,
  useTheme,
  createStyles,
} from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const useStyles = makeStyles((theme: Theme) => ({
  gridItem: {
    marginRight: 20,
    paddingLeft: 0,
  },
  gridList: {
    flexWrap: "nowrap",
    height: 120,
    margin: "0!important",
    transform: "translateX(-20px)",
    color: theme.palette.text.secondary,
    overflowY: "auto",
  },
  tile: {
    padding: "0!important",
    minWidth: "150px",
    maxWidth: "150px",
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
}));
