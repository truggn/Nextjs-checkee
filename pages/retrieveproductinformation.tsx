//import ListUser from "@/ListUser/ListUser";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";

import dynamic from "next/dynamic";

const RetrieveProductInformation = dynamic(
  () =>
    import(
      "../Frontend/components/RetrieveProductInformation/RetrieveProductInformation"
    )
);
//import Main from "@/Main/Main2";
const Main2 = dynamic(() => import("@/Main/Main2"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);
const ListBranchs = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Main2 />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
          <RetrieveProductInformation />
        </div>
      </main>
    </div>
  );
};

export default ListBranchs;
