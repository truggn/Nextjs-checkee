import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  description: {
    width: "100%",
    maxWidth: 912,
    margin: 10,
    marginRight: 0,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
