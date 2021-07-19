import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  button: {
    margin: theme.spacing(1),
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
  tableRightBorder: {
    border: "1px solid rgba(224, 224, 224, 1)",
  },
  cardAction: {
    justifyContent: "flex-end",
  },
  description: {
    width: "100%",
    maxWidth: 912,
    margin: 10,
    marginRight: 0,
  },
  icons: {
    margin: 8,
    borderStyle: "solid",
    borderWidth: 1,
    width: "100%",
    borderRadius: 5,
    padding: 8,
    borderColor: "#BDBDBD",
  },
}));
