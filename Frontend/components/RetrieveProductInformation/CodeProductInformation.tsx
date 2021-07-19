import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { useStyles } from "./style";
import { useSelector } from "react-redux";
import { IProduct } from "../../redux/actions/RetrieveProductInformationActions";

const CodeProductInformation = () => {
  const classes = useStyles();
  const codeProduct: IProduct = useSelector(
    (state: any) => state.RetrieveProductInformation.productData
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paperCode} color="primary">
          <Typography className={classes.titleCode}>Mã truy xuất</Typography>
          <Typography className={classes.titleCode}>
            {codeProduct.code}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paperCode}>
          <Typography className={classes.titleCode}>Tên truy xuất</Typography>
          <Typography className={classes.titleCode}>
            {codeProduct.name}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default CodeProductInformation;
