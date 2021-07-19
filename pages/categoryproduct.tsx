//import UpdateUser from "@/ListUser/UpdateUser";
import {
    createStyles,
    makeStyles,
    useTheme,
    Theme,
  } from "@material-ui/core/styles";
import CategoryProduct from "Frontend/components/CategoryProduct/CategoryProduct";
  //import Main from "@/Main/Main";
  import dynamic from 'next/dynamic'
  const UpdateUser = dynamic(() => import('@/ListUser/UpdateUser'))
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
  const categoryproduct = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Main />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <CategoryProduct/>
          </div>
        </main>
      </div>
    );
  };
  
  export default categoryproduct;
  