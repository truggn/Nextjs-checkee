import React from "react";
import CropFreeIcon from "@material-ui/icons/CropFree";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Card,
  CardContent,
} from "@material-ui/core";
import useStyles from "./InforRetrieveProduct.styles";

const CodeRetrieveProduct = ({ code, name }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Typography className={classes.titleHeader}>
          KẾT QUẢ TRUY XUẤT QR
        </Typography>
        <Grid container className={classes.itemContainer}>
          <Grid item md={6} xs={12} className={classes.itemHeader}>
            <Grid container>
              <CropFreeIcon fontSize="small" style={{ marginRight: 5 }} />
              <Typography className={classes.title}>MÃ TRUY XUẤT</Typography>
              <Typography className={classes.titleCode2}>{code}</Typography>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid container>
              <SpellcheckIcon fontSize="small" style={{ marginRight: 5 }} />
              <Typography className={classes.title}>TÊN TRUY XUẤT</Typography>
              <Typography className={classes.titleName}>{name}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default CodeRetrieveProduct;
