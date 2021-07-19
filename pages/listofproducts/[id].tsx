//import UpdateUser from "@/ListUser/UpdateUser";
import { useRouter } from "next/router";
import {
    createStyles,
    makeStyles,
    useTheme,
    Theme,
  } from "@material-ui/core/styles";
import ListOfProducts from "Frontend/components/ListOfProducts/ListOfProducts";
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
  const listofproducts = () => {
    const classes = useStyles();
    const router = useRouter();
    const { id } = router.query;
  

    return (
      <div className={classes.root}>
        <Main />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <ListOfProducts id={id}/>
          </div>
        </main>
      </div>
    );
  };
  
  export default listofproducts;
  