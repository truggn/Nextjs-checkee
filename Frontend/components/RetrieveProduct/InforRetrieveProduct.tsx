import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Card,
  CardContent,
} from "@material-ui/core";
import useStyles from "./InforRetrieveProduct.styles";
import CodeRetrieveProduct from "./CodeRetrieveProduct";
import ImagesRetrieveProduct from "./ImagesRetrieveProduct";
import ParticipantRetrieveProduct from "./ParticipantRetrieveProduct";
import DescriptionRetrieveProduct from "./DescriptionRetrieveProduct";

const InforRetrieveProduct = ({ dataRetrieve }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.mainRetrieve} spacing={2}>
      <CodeRetrieveProduct code={dataRetrieve.code} name={dataRetrieve.name} />
      <ImagesRetrieveProduct images={dataRetrieve.images} />
      <ParticipantRetrieveProduct participant={dataRetrieve.information} />
      <DescriptionRetrieveProduct description={dataRetrieve.description} />
    </Grid>
  );
};

export default InforRetrieveProduct;
