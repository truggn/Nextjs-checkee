import React from "react";
import useSWR from "swr";
import { Grid, Typography } from "@material-ui/core";
import useStyles from "./Main.styles";
import { RETRIEVEPRODUCTINFORMATION } from "../../constant.config.api/index";
import axios from "axios";
import InforRetrieveProduct from "./InforRetrieveProduct";

const fetcher = (url) => axios.get(url).then((res) => res.data);

// This is retrieve product of customer, irrelevant to admin
const MainRetrieveProduct = ({ code }) => {
  const classes = useStyles();

  // fetch data retrieve product
  const { data, error } = useSWR(
    `${RETRIEVEPRODUCTINFORMATION}/retrieveInformation?code=${code}`,
    fetcher
  );

  // render error
  if (error)
    return (
      <Grid container justify="center">
        <Typography style={{ textAlign: "center" }}>
          {" "}
          Tải trang thất bại ❌❌❌
        </Typography>
      </Grid>
    );

  // loading
  if (!data)
    return (
      <Grid>
        <Typography style={{ textAlign: "center" }}>Loading...</Typography>
      </Grid>
    );

  return (
    <Grid className={classes.root}>
      <Grid className={classes.main}>
        {data.data && <InforRetrieveProduct dataRetrieve={data.data} />}
      </Grid>
    </Grid>
  );
};

export default MainRetrieveProduct;
