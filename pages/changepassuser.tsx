//import ChangePassUser from "@/ListUser/ChangePassUser";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
//import Main from "@/Main/Main";
import dynamic from 'next/dynamic'
const ChangePassUser = dynamic(() => import('@/ListUser/ChangePassUser'))
const Main = dynamic(() => import('@/Main/Main2'))
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
const ChangePassUsers = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Main />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
          <ChangePassUser />
        </div>
      </main>
    </div>
  );
};

export default ChangePassUsers;
