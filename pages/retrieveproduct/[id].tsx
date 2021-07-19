import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Grid, makeStyles } from "@material-ui/core";
import { dataImage } from "../../files/images/dataImages";
const MainRetrieveProduct = dynamic(
  () => import("@/RetrieveProduct/MainRetrieveProduct")
);

const useStyles = makeStyles((theme) => ({
  header: {
    height: 100,
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
    [theme.breakpoints.down("xs")]: {
      height: 70,
    },
  },
  navBar: {
    maxWidth: 1200,
    margin: "0 auto",
    height: "100%",
    cursor: "pointer",
  },
  logoImg: {
    width: "250px",
    height: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "200px",
    },
  },
  main: {
    maxWidth: 1200,
    margin: "0 auto",
  },
}));

const RetrievieProduct = () => {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <header className={classes.header}>
        <Grid container alignItems="center" className={classes.navBar}>
          <Grid item>
            <img
              src={dataImage}
              alt="checkee retrieve product"
              className={classes.logoImg}
            />
          </Grid>
        </Grid>
      </header>
      <Grid className={classes.main}>
        <MainRetrieveProduct code={id} />
      </Grid>
    </>
  );
};

export default RetrievieProduct;
